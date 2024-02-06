'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { parse } from '@conform-to/zod';
import { type Article } from '@prisma/client';

import { handlePrismaErrors } from '@/utils/prisma';
import { prisma } from '@/utils/prisma-client';

import { articleSchema, type ArticleSchemaType } from '@/lib/validations/articles';

export async function createArticle(
	_: ActionReturnType<ArticleSchemaType>,
	formData: FormData,
): Promise<ActionReturnType<ArticleSchemaType>> {
	const submission = parse(formData, { schema: articleSchema });

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

	let article!: Article;
	const { title, content, topicId } = submission.value;

	try {
		const user = await prisma.session.findUnique({
			where: { id: sessionId },
			select: { userId: true },
		});

		if (!user?.userId) {
			throw new Error('Something went wrong');
		}

		article = await prisma.article.create({
			data: {
				topicId,
				title,
				content,
			},
		});
	} catch (err) {
		handlePrismaErrors(err);
	}

	revalidatePath(`/app/topics/${topicId}/articles`);

	redirect(`/app/topics/${topicId}/articles/${article.id}`);
}

export async function editArticle(
	_: ActionReturnType<ArticleSchemaType>,
	formData: FormData,
): Promise<ActionReturnType<ArticleSchemaType>> {
	const submission = parse(formData, { schema: articleSchema });

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

	const { title, content, topicId, id } = submission.value;

	try {
		const user = await prisma.session.findUnique({
			where: { id: sessionId },
			select: { userId: true },
		});

		if (!user?.userId) {
			throw new Error('Something went wrong');
		}

		await prisma.article.update({
			where: { id },
			data: {
				title,
				content,
			},
		});
	} catch (err) {
		handlePrismaErrors(err);
	}

	revalidatePath(`/app/topics/${topicId}/articles`);

	redirect(`/app/topics/${topicId}/articles/${id}`);
}
