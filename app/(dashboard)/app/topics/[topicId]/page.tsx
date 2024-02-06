import Link from 'next/link';

import { buttonVariants } from '@/components/core/button/variants';

import { cn } from '@/utils/misc';

import { getTopic } from '@/app/api/topics';

export default async function TopicPage({ params }: { params: { topicId: string } }) {
	const topicData = await getTopic(params.topicId);
	const { topic } = topicData || {};

	if (!topic) {
		return <div className="flex items-center justify-center text-body-xl h-full">Topic not found</div>;
	}

	return (
		<div className="h-full p-lg w-full">
			<header className="flex items-center justify-between">
				<h6 className="text-h6">Topic title - {topic.title}</h6>
				<Link className={cn(buttonVariants({ variant: 'link' }))} href={`/app/topics/${params.topicId}/articles`}>
					Go to articles
				</Link>
			</header>
		</div>
	);
}
