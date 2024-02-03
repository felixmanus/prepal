import { cleanupDb, createPassword } from '@/utils/db-utils';
import { prisma } from '@/utils/prisma-client';

async function seed() {
	console.log('🌱 Seeding...');

	await cleanupDb(prisma);

	const user = await prisma.user.create({
		data: {
			email: 'ghukasyan.programming@gmail.com',
			verified: true,
			firstName: 'Norayr',
			lastName: 'Ghukasyan',
			username: 'felix_manus',
			password: {
				create: createPassword('Test1234'),
			},
		},
	});

	await prisma.topic.createMany({
		data: [
			{ title: 'Javascript', userId: user.id },
			{ title: 'NodeJS', userId: user.id },
			{ title: 'Typescript', userId: user.id },
			{ title: 'Network', userId: user.id },
			{ title: 'SSH', userId: user.id },
			{ title: 'Remix', userId: user.id },
			{ title: 'NextJS', userId: user.id },
			{ title: 'HTML5', userId: user.id },
			{ title: 'CSS3', userId: user.id },
			{ title: 'React', userId: user.id },
			{ title: 'CI/CD', userId: user.id },
			{ title: 'DB & ORMs', userId: user.id },
		],
	});

	const jsTopic = await prisma.topic.findFirst({ where: { title: 'Javascript' } });

	await prisma.topic.createMany({
		data: [
			{ title: 'Objects', parentId: jsTopic?.id, userId: user.id },
			{ title: 'Arrays', parentId: jsTopic?.id, userId: user.id },
			{ title: 'API', parentId: jsTopic?.id, userId: user.id },
			{ title: 'FP', parentId: jsTopic?.id, userId: user.id },
			{ title: 'OOP', parentId: jsTopic?.id, userId: user.id },
			{ title: 'ES6', parentId: jsTopic?.id, userId: user.id },
			{ title: 'Design Patterns', parentId: jsTopic?.id, userId: user.id },
		],
	});

	const jsObjectsTopic = await prisma.topic.findFirst({ where: { title: 'Objects' } });

	await prisma.article.createMany({
		data: [
			{ title: 'How correctly delete values from object', content: 'Some test content', topicId: jsObjectsTopic?.id! },
			{ title: 'What are objects', content: 'Some test content about objects', topicId: jsObjectsTopic?.id! },
		],
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
