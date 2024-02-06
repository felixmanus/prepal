import Link from 'next/link';

import { buttonVariants } from '@/components/core/button/variants';

import { cn } from '@/utils/misc';

export const PublicHeader = () => {
	return (
		<header className="flex items-center justify-between px-xxl py-md bg-transparent">
			<h6 className="text-h6 mr-xxl">
				<Link href="/">Prepal</Link>
			</h6>
			<ul className="mr-auto flex items-center">
				<li>
					<Link href="/missions" className={cn(buttonVariants({ variant: 'link' }))}>
						Our mission
					</Link>
				</li>
				<li>
					<Link href="/features" className={cn(buttonVariants({ variant: 'link' }))}>
						Features
					</Link>
				</li>
				<li>
					<Link href="/contact" className={cn(buttonVariants({ variant: 'link' }))}>
						Contact
					</Link>
				</li>
			</ul>
			<ul className="shrink-0 flex items-center">
				<li>
					<Link href="/login" className={cn(buttonVariants({ variant: 'link' }))}>
						Login
					</Link>
				</li>
				<li>
					<Link href="/signup" className={cn(buttonVariants({ variant: 'link' }))}>
						Sign up
					</Link>
				</li>
			</ul>
		</header>
	);
};
