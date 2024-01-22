import * as React from 'react';
import { type SVGProps } from 'react';

import { clsx } from 'clsx';

import { cn } from '@/utils/misc';

const sizeClassName = {
	xs: 'w-[0.75rem] h-[0.75rem]',
	sm: 'w-[1rem] h-[1rem]',
	md: 'w-[1.5rem] h-[1.5rem]',
	lg: 'w-[2rem] h-[2rem]',
	xl: 'w-[3rem] h-[3rem]',
} as const;

type Size = keyof typeof sizeClassName;

const childrenSizeClassName = {
	xs: 'gap-1.5',
	sm: 'gap-1.5',
	md: 'gap-2',
	lg: 'gap-2',
	xl: 'gap-3',
} satisfies Record<Size, string>;

export const Icon = React.forwardRef<
	SVGSVGElement,
	SVGProps<SVGSVGElement> & {
		name: IconName;
		size?: Size;
	}
>(({ name, size = 'md', className, children, ...props }, ref) => {
	const iconClassNames = clsx({ 'cursor-pointer': props.onClick });

	if (children) {
		return (
			<span className={`inline-flex shrink-0 items-center ${childrenSizeClassName[size]}`}>
				<Icon name={name} size={size} className={className} {...props} ref={ref} />
				{children}
			</span>
		);
	}
	return (
		<svg
			{...props}
			className={cn(sizeClassName[size], 'inline shrink-0 self-center', className, iconClassNames)}
			ref={ref}
		>
			<use href={`./icons/sprite.svg#${name}`} />
		</svg>
	);
});

Icon.displayName = 'Icon';
