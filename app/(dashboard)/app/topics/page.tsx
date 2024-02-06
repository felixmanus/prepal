import Link from 'next/link';

import { buttonVariants } from '@/components/core/button/variants';
import { Icon } from '@/components/core/icon';

import { cn } from '@/utils/misc';

import { getTopics } from '@/app/api/topics';

export default async function Topics() {
	const topics = await getTopics();

	if (!topics || (Array.isArray(topics) && topics.length === 0)) {
		return (
			<div className="p-lg h-full">
				<header className="flex items-center justify-between px-md py-lg border-b border-b-gray-100">
					<h3 className="text-h3">Your topics</h3>
				</header>
				<section className="h-full flex flex-col items-center justify-center">
					<h3 className="text-h3">You still don't have topics</h3>
				</section>
			</div>
		);
	}

	return (
		<div className="p-xl h-full">
			<section className="flex items-center justify-center shadow-sm bg-white h-full">
				<div className="text-body-xl font-semibold">Still to come</div>
			</section>
		</div>
	);
}
