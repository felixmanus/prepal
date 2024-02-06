'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { parse } from '@conform-to/zod';
import { type Topic } from '@prisma/client';

import { handlePrismaErrors } from '@/utils/prisma';
import { prisma } from '@/utils/prisma-client';

import { topicSchema, type TopicSchemaType } from '@/lib/validations/topics';

export async function createTopic(
	_: ActionReturnType<TopicSchemaType>,
	formData: FormData,
): Promise<ActionReturnType<TopicSchemaType>> {
	const submission = parse(formData, { schema: topicSchema });

	if (submission.intent !== 'submit') {
		return { status: 'idle', submission };
	}

	if (!submission.value) {
		return { status: 'error', submission };
	}

	const sessionId = cookies().get('__session')?.value;

	if (!sessionId) {
		throw new Error('Something went wrong');
	}

	let topic!: Topic;
	const { title, parentId } = submission.value;

	try {
		const user = await prisma.session.findUnique({
			where: { id: sessionId },
			select: { userId: true },
		});

		if (!user?.userId) {
			throw new Error('Something went wrong');
		}

		topic = await prisma.topic.create({
			data: {
				parentId,
				title,
				userId: user?.userId,
			},
		});
	} catch (err) {
		handlePrismaErrors(err);
	}

	revalidatePath('/app/topics');

	redirect(`/app/topics/${topic.id}`);
}
