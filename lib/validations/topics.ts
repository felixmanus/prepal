import { z } from 'zod';

export const topicSchema = z.object({
	title: z
		.string({ required_error: 'Title is required' })
		.min(2, 'Title should contain at least 2 characters')
		.max(50, 'Title should contain less than 50 characters'),
	parentId: z.string().optional(),
});

export type TopicSchemaType = z.infer<typeof topicSchema>;
