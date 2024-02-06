import { revalidatePath } from 'next/cache';
import { type NextRequest } from 'next/server';

import { prisma } from '@/utils/prisma-client';

export async function DELETE(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const id = searchParams.get('id');
	const sessionId = request.cookies.get('__session')?.value;

	if (!id) {
		return new Response(null, { status: 400 });
	}

	if (!sessionId) {
		throw new Response(null, { status: 401 });
	}

	try {
		await prisma.article.delete({
			where: { id },
		});

		revalidatePath('/app/topics/[topicId]/articles', 'layout');

		return Response.json({ success: true, message: 'Article deleted successfully' }, { status: 200 });
	} catch (err) {
		return Response.json(
			{ success: false, message: "The operation wasn't successfull, please try again later" },
			{ status: 500 },
		);
	}
}
