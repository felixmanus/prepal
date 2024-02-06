import { Prisma } from '@prisma/client';

import { APIError, HttpStatusCode } from './error-handler';

export const handlePrismaErrors = (err: any) => {
	if (err instanceof Prisma.PrismaClientKnownRequestError) {
		switch (err.code) {
			case 'P2002': {
				throw new APIError('USER_EXISTS', HttpStatusCode.ALREADY_EXISTS, err.message);
			}
		}
	}

	if (err instanceof Prisma.PrismaClientUnknownRequestError) {
		throw new Error('Something went wrong on our side');
	}

	throw new Error('Something went wrong on our side');
};
