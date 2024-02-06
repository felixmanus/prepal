import { getTopic } from '@/app/api/topics';

export default async function TopicArticles({ params }: { params: { topicId: string } }) {
	const topicData = await getTopic(params.topicId);
	const { topic } = topicData || {};

	if (!topic?.articles.length) {
		return (
			<div className="w-full h-full">
				<section className="flex items-center justify-center text-body-lg font-semibold h-full w-full">
					You still don't have any article
				</section>
			</div>
		);
	}

	return null;
}
