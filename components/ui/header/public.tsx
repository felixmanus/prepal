import Link from 'next/link';

import { buttonVariants } from '@/components/core/button';
import { Icon } from '@/components/core/icon';

import { cn } from '@/utils/misc';

export const PublicHeader = () => {
	return (
		<header className="flex items-center justify-between px-lg py-md bg-white sticky top-0 z-10 grd-header shadow-sm">
			<h6 className="text-h6">
				<Link href="/">Prepal</Link>
			</h6>
			<ul className="ml-auto flex items-center">
				<li>
					<Link href="/missions" className={cn(buttonVariants({ variant: 'link' }))}>
						Our mission
						<Icon name="arrow-down" />
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
				<li className="ml-xxl">
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
