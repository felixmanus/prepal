import { Fragment } from 'react';

import MarkdownRender from '@/components/core/markdown';

import { getArticle } from '@/app/api/articles';

export default async function ArticlePage({ params }: { params: { articleId: string; topicId: number } }) {
	const article = await getArticle(params.articleId);

	return (
		<div className="h-full border-l border-gray-200 flex flex-col">
			{article ? (
				<Fragment>
					<header className="p-md border-b border-gray-300">
						<p title={article?.title} className="text-h6 text-nowrap text-ellipsis overflow-hidden">
							{article?.title}
						</p>
					</header>
					<section className="px-xs py-sm overflow-auto">
						<MarkdownRender mdString={article?.content!} />
					</section>
				</Fragment>
			) : (
				<div className="h-full flex items-center justify-center text-body-lg font-semibold">Article doesn't exist</div>
			)}
		</div>
	);
}
