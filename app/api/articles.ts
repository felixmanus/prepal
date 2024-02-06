import { cache } from 'react';

import { cookies } from 'next/headers';

import { handlePrismaErrors } from '@/utils/prisma';
import { prisma } from '@/utils/prisma-client';

export const getArticles = cache(async (topicId: string) => {
	const sessionId = cookies().get('__session')?.value;

	if (!sessionId) {
		throw new Error('Something went wrong');
	}

	try {
		return await prisma.article.findMany({
			where: { topicId },
		});
	} catch (err) {
		handlePrismaErrors(err);
	}
});

export const getArticle = cache(async (id: string) => {
	const sessionId = cookies().get('__session')?.value;

	if (!sessionId) {
		throw new Error('Something went wrong');
	}

	try {
		return await prisma.article.findUnique({
			where: { id },
		});
	} catch (err) {
		handlePrismaErrors(err);
	}
});
