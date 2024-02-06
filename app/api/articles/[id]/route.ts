import { revalidatePath } from 'next/cache';
import { type NextRequest } from 'next/server';

import { prisma } from '@/utils/prisma-client';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
	const id = params.id;

	const sessionId = request.cookies.get('__session')?.value;

	if (!id) {
		return new Response(null, { status: 400 });
	}

	if (!sessionId) {
		throw new Response(null, { status: 401 });
	}

	try {
		const article = await prisma.article.findUnique({
			where: { id },
			select: { title: true, content: true },
		});

		revalidatePath('/app/topics');

		return Response.json(article, { status: 200 });
	} catch (err) {
		return Response.json({ success: false, message: "Couldn't find the article" }, { status: 404 });
	}
}
