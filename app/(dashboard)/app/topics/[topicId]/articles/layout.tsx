import { ArticleListItem } from '@/components/ui/article-list-item';

import { cn } from '@/utils/misc';

import { getTopic } from '@/app/api/topics';

export default async function TopicArticles({
	params,
	children,
}: {
	children: React.ReactNode;
	params: { topicId: string };
}) {
	const topicData = await getTopic(params.topicId);
	const { topic } = topicData || {};

	if (!topic) {
		return <div className="flex items-center justify-center text-body-xl h-full">Topic not found</div>;
	}

	const articlesSectionClassNames = !topic?.articles.length ? 'w-0 p-0 max-w-auto grow-0' : '';
	const childrenSectionClassName = !topic?.articles.length ? 'max-w-[100%]' : '';

	return (
		<div className="flex w-full">
			<section
				className={cn('grow overflow-y-auto overflow-x-hidden max-w-[40%] pr-md pb-md', articlesSectionClassNames)}
			>
				{topic?.articles
					?.sort((a, b) => a.createdAt.valueOf() - b.createdAt.valueOf())
					.map(article => <ArticleListItem key={article.id} {...article} topicId={params.topicId} />)}
			</section>
			<section className={cn('grow max-w-[60%]', childrenSectionClassName)}>{children}</section>
		</div>
	);
}
