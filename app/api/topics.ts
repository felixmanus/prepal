import { cache } from 'react';

import { cookies } from 'next/headers';

import { type Topic, type Article } from '@prisma/client';

import { handlePrismaErrors } from '@/utils/prisma';
import { prisma } from '@/utils/prisma-client';

export const getTopics = cache(async () => {
	const sessionId = cookies().get('__session')?.value;

	if (!sessionId) {
		throw new Error('Something went wrong');
	}

	try {
		const user = await prisma.session.findUnique({
			where: { id: sessionId },
			select: { userId: true },
		});

		return await prisma.topic.findMany({
			select: {
				id: true,
				title: true,
				parentId: true,
				articles: {
					select: {
						id: true,
						title: true,
						content: true,
						topicId: true,
					},
				},
			},
			where: { userId: user?.userId },
		});
	} catch (err) {
		handlePrismaErrors(err);
	}
});

interface ITopicData {
	topic: Pick<Topic, 'title' | 'parentId'> & { articles: Article[] };
	parents: string[];
}

export const getTopic = cache(async (id: string) => {
	const sessionId = cookies().get('__session')?.value;

	if (!sessionId) {
		throw new Error('Something went wrong');
	}

	const topicData = {} as ITopicData;

	const getTopicWithParent = async (id: string) => {
		const topic = await prisma.topic.findUnique({
			select: {
				parentId: true,
				title: true,
				articles: true,
			},
			where: { id },
		});

		if (topic) {
			topicData.parents = [topic?.title, ...(topicData.parents || [])];
		}

		// Setting the actual topic
		if (!topicData.topic && topic) {
			topicData.topic = topic;
		}

		if (topic?.parentId) {
			await getTopicWithParent(topic.parentId);
		}

		return topicData;
	};

	try {
		return await getTopicWithParent(id);
	} catch (err) {
		handlePrismaErrors(err);
	}
});
