'use client';

import Link from 'next/link';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/core/accordion';
import { Icon } from '@/components/core/icon';

interface MultiLevelListProps {
	items: IMappedTopic[];
}

const TopicTitle = ({ title, topicId }: { title: React.ReactNode; topicId: string }) => (
	<div className="flex items-center grow max-w-[80%]">
		<Icon name="folder" size="sm" />
		<span title={String(title)} className="ml-xxs text-body-sm text-nowrap text-ellipsis overflow-hidden">
			{title}
		</span>
		<Link href={`/app/topics/${topicId}`} className="ml-auto cursor-pointer rounded-md hover:scale-110 duration-200">
			<Icon name="arrow-right" />
		</Link>
	</div>
);

export const MultiLevelList = ({ items }: MultiLevelListProps) => {
	const generateList = (list: any[], level: number) => {
		return list.map(item => {
			let accordionContent;
			const hasNestedList = !!item.topics.length;

			const topicTitle = <TopicTitle title={item.title} topicId={item.id} />;

			if (!hasNestedList) {
				accordionContent = (
					<div className="px-xs overflow-hidden [&>*:nth-child(odd)]:bg-slate-200 [&>p:hover]:bg-slate-300">
						{item.articles.map((article: IArticle) => (
							<p
								title={article.title}
								className="px-sm py-xs cursor-pointer text-ellipsis whitespace-nowrap overflow-hidden rounded-sm"
								key={article.id}
							>
								<Link href={`/app/topics/${item.id}/articles/${article.id}`} className="text-body-sm">
									{article.title}
								</Link>
							</p>
						))}
					</div>
				);
			} else {
				accordionContent = (
					<Accordion className="w-full overflow-hidden" type="multiple" style={{ paddingLeft: `${level * 10}px` }}>
						{generateList(item.topics, level + 1)}
					</Accordion>
				);
			}

			return (
				<AccordionItem value={item.id} key={item.id} className="rounded-sm">
					<div className="flex items-center grow py-xs px-sm hover:bg-gray-200 overflow-hidden">
						<AccordionTrigger className="mr-xs" />
						{topicTitle}
					</div>
					<AccordionContent className="py-sm">{accordionContent}</AccordionContent>
				</AccordionItem>
			);
		});
	};

	const list = generateList(items, 1);

	return (
		<Accordion type="multiple" className="[&>*:nth-child(odd)]:bg-gray-100">
			{list}
		</Accordion>
	);
};
