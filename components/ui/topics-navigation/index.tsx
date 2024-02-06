'use client';

import Link from 'next/link';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/core/accordion';
import { Icon } from '@/components/core/icon';

interface MultiLevelListProps {
	items: IMappedTopic[];
}

const TopicTitle = ({ title, topicId }: { title: React.ReactNode; topicId: string }) => (
	<div className="flex items-center grow">
		<Icon name="folder" />
		<span className="ml-xxs text-body-sm">{title}</span>
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
					<div className="px-xs overflow-hidden">
						{item.articles.map((article: IArticle) => (
							<p
								title={article.title}
								className="px-sm py-xs cursor-pointer text-ellipsis whitespace-nowrap overflow-hidden"
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
				<AccordionItem value={item.id} key={item.id}>
					<div className="flex items-center grow">
						<AccordionTrigger className="mr-xs" />
						{topicTitle}
					</div>
					<AccordionContent>{accordionContent}</AccordionContent>
				</AccordionItem>
			);
		});
	};

	const list = generateList(items, 1);

	return <Accordion type="multiple">{list}</Accordion>;
};
