import { z } from 'zod';

export const articleSchema = z.object({
	id: z.string().optional(),
	title: z
		.string({ required_error: 'Title is required' })
		.min(2, 'Title should contain at least 2 characters')
		.max(80, 'Title should contain less than 80 characters'),
	content: z.string({ required_error: 'Title is required' }).min(10, 'Title should contain at least 10 characters'),
	topicId: z.string(),
});

export type ArticleSchemaType = z.infer<typeof articleSchema>;
