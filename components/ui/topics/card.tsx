'use client';

import { Icon } from '@/components/core/icon';

interface ITopicCard {
	id: string;
	title: string;
	createdAt: Date;
	updatedAt: Date;
	articlesCount: number;
}

export const TopicCard = ({ id, title, createdAt, updatedAt, articlesCount }: ITopicCard) => {
	const deleteTopic = () => {};

	return (
		<div className="flex p-md shadow-sm border border-gray-50">
			<header>
				<h6 className="text-h6">{title}</h6>
				<Icon name="trash" onClick={deleteTopic} />
			</header>
		</div>
	);
};
