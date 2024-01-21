import { faker } from '@faker-js/faker';
import { type PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

export const cleanupDb = async (prisma: PrismaClient) => {
	const tables = await prisma.$queryRaw<
		{ table_name: string }[]
	>`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name NOT LIKE '_prisma_migrations';`;

	await prisma.$transaction([
		// Delete all rows from each table, preserving table structures
		...tables.map(({ table_name }) => prisma.$executeRawUnsafe(`DELETE from "${table_name}"`)),
	]);
};

export function createPassword(password: string = faker.internet.password()) {
	return {
		hash: bcrypt.hashSync(password, 10),
	};
}
