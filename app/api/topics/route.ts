import { type NextRequest } from 'next/server';

import { handlePrismaErrors } from '@/utils/prisma';
import { prisma } from '@/utils/prisma-client';

export async function GET(request: NextRequest) {
	const sessionId = request.cookies.get('__session')?.value;

	if (!sessionId) {
		throw new Response(null, { status: 401 });
	}

	try {
		const user = await prisma.session.findUnique({
			where: { id: sessionId },
			select: { userId: true },
		});

		const topics = await prisma.topic.findMany({
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

		return Response.json({ topics });
	} catch (err) {
		handlePrismaErrors(err);
	}
}
