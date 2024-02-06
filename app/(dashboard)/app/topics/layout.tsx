import Link from 'next/link';

import { buttonVariants } from '@/components/core/button/variants';
import { Field } from '@/components/core/form/field';
import { Icon } from '@/components/core/icon';
import { MultiLevelList } from '@/components/ui/topics-navigation';

import { cn } from '@/utils/misc';

import { getTopics } from '@/app/api/topics';

export default async function TopicsLayout({ children }: { children: React.ReactNode }) {
	const topics = await getTopics();

	const buildTopicTree = (flatTopics: ITopic[], parentId: string | null = null): Array<IMappedTopic> => {
		if (!flatTopics) {
			return [];
		}

		return flatTopics
			.filter((topic: ITopic) => topic.parentId === parentId)
			.map((topic: ITopic) => ({
				id: topic.id,
				title: topic.title,
				articles: topic.articles,
				topics: buildTopicTree(flatTopics, topic.id),
			}));
	};

	const mappedTopics = buildTopicTree(topics as ITopic[]);

	return (
		<div className="p-xl h-full">
			<section className="flex shadow-sm bg-white h-full rounded-lg">
				<nav className="flex flex-col py-lg border-b border-b-gray-100 bg-gray-50 rounded-t-lg shrink-0 sm:w-[12rem] sm:max-w-[12rem] md:w-[12rem] md:max-w-[12rem] lg:w-[14rem] lg:max-w-[14rem] xl:w-[16rem] xl:max-w-[16rem]">
					<header className="px-md border-b border-b-gray-200">
						<div className="flex flex-col">
							<Field
								inputProps={{
									placeholder: 'Find a certain topic',
								}}
							/>
						</div>
						<Link
							href="/app/topics/new"
							className={cn(
								'border w-full mt-lg flex items-center justify-between mb-xl border-gray-200 rounded-md p-sm hover:bg-gray-200',
								buttonVariants({ size: 'sm', variant: 'primary' }),
							)}
						>
							<span className="text-body-sm mr-sm">Create new topic</span>
							<Icon name="plus-circled" />
						</Link>
					</header>
					<div className="mt-xs h-full overflow-auto p-md">
						<MultiLevelList items={mappedTopics} />
					</div>
				</nav>
				<div className="grow-[7] overflow-hidden">{children}</div>
			</section>
		</div>
	);
}
