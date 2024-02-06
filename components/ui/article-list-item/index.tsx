'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Icon } from '@/components/core/icon';
import { useToast } from '@/components/core/toast/use-toast';

import { cn } from '@/utils/misc';

interface ArticleListItemProps {
	id: string;
	topicId: string;
	title: string;
	content: string;
	createdAt: Date;
	updatedAt: Date;
	className?: string;
}

export const ArticleListItem = ({ title, content, className, createdAt, id, topicId }: ArticleListItemProps) => {
	const router = useRouter();
	const { toast } = useToast();

	const deleteArticle = async (e: React.MouseEvent<HTMLParagraphElement>) => {
		e.preventDefault();
		e.stopPropagation();
		const res = await fetch(`/api/articles/?id=${id}`, { method: 'DELETE' });
		const data = await res.json();

		toast({
			variant: data.success ? 'success' : 'error',
			title: data.message,
		});
	};

	const editArticle = (e: React.MouseEvent<HTMLParagraphElement>) => {
		e.preventDefault();
		e.stopPropagation();
		router.push(`/app/topics/${topicId}/articles/${id}/edit`);
	};

	return (
		<div
			className={cn(
				'cursor-pointer hover:bg-gray-100 mt-lg flex flex-col last:mb-0 rounded-md bg-gray-50 shadow-md px-md py-sm max-h-[15rem] min-w-[10rem]',
				className,
			)}
			onClick={() => router.push(`/app/topics/${topicId}/articles/${id}`)}
		>
			<header className="flex h-[3rem] shrink-0 items-center w-full overflow-hidden pb-md border-b border-gray-100">
				<span title={title} className="text-body-md font-bold text-nowrap text-ellipsis overflow-hidden w-full">
					{title}
				</span>
				<div className="flex items-center justify-between shrink-0 border-l border-gray-300 px-xs basis-[5rem]">
					<p className="flex p-xxs items-center hover:bg-gray-200 hover:rounded-full" onClick={deleteArticle}>
						<Icon name="trash" />
					</p>
					<p className="flex items-center p-xxs hover:bg-gray-200 hover:rounded-full" onClick={editArticle}>
						<Icon name="pencil" />
					</p>
				</div>
			</header>
			<div className="overflow-hidden py-sm flex flex-col">
				<p className="text-body-sm overflow-hidden text-ellipsis text-nowrap">{content}</p>
			</div>
			<footer className="border-t pt-sm border-gray-300">
				<strong className="text-body-sm">Published - </strong>
				<span className="text-body-sm">
					{createdAt.toLocaleDateString('en-us', {
						year: 'numeric',
						month: 'short',
						day: '2-digit',
						hour: '2-digit',
						minute: '2-digit',
						timeZone: 'UTC',
						timeZoneName: 'short',
					})}
				</span>
			</footer>
		</div>
	);
};
