import Link from 'next/link';

import { buttonVariants } from '@/components/core/button/variants';
import { Icon } from '@/components/core/icon';

import { cn } from '@/utils/misc';

import { getTopic } from '@/app/api/topics';

export default async function TopicLayout({
	params,
	children,
}: {
	children: React.ReactNode;
	params: { topicId: string };
}) {
	const topicData = await getTopic(params.topicId);
	const { topic, parents } = topicData || {};

	if (!topic) {
		return <div className="flex items-center justify-center text-body-xl h-full">Topic not found</div>;
	}

	return (
		<div className="px-xl h-full flex flex-col">
			<header className="flex items-center justify-between py-md border-b-[1px] border-b-gray-200">
				<div className="flex flex-col py-xs rounded-md">
					<p className="p-xs text-body-sm bg-gray-100 rounded-md">{parents?.join(' / ')}</p>
				</div>
				<div className="flex items-center">
					<span className="text-body-sm font-semibold mr-xl">Total articles - {topic?.articles?.length}</span>
					<Link className={cn(buttonVariants({ size: 'sm' }))} href={`/app/topics/${params.topicId}/articles/new`}>
						<span className="text-body-sm mr-xs">Create article</span>
						<Icon name="plus-circled" />
					</Link>
				</div>
			</header>
			<section className="flex justify-between h-full overflow-hidden">{children}</section>
		</div>
	);
}
