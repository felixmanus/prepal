import { cleanupDb, createPassword } from '@/utils/db-utils';
import { prisma } from '@/utils/prisma-client';

async function seed() {
	console.log('🌱 Seeding...');

	await cleanupDb(prisma);

	await prisma.user.create({
		data: {
			email: 'example@gmail.com',
			name: 'Norayr Ghukasyan',
			username: 'felix_manus',
			password: {
				create: createPassword('12345678'),
			},
		},
	});
}

seed()
	.catch(e => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
