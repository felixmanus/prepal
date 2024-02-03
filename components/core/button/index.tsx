'use client';

import * as React from 'react';

import { Slot } from '@radix-ui/react-slot';
import { type VariantProps } from 'class-variance-authority';
import { useFormStatus } from 'react-dom';

import { cn } from '@/utils/misc';

import { Icon } from '../icon';
import { buttonVariants } from './variants';

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
	dataTestId?: string;
	pending?: boolean;
	disabled?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			children,
			className,
			variant,
			size,
			disabled = false,
			pending = false,
			asChild = false,
			dataTestId = 'button',
			...props
		},
		ref,
	) => {
		const { pending: formPending } = useFormStatus();

		const Comp = asChild ? Slot : 'button';

		return (
			<Comp
				ref={ref}
				data-testid={dataTestId}
				className={cn(buttonVariants({ variant, size, className }))}
				{...props}
				disabled={formPending || pending || disabled}
				aria-disabled={formPending || pending || disabled}
			>
				{pending || formPending ? (
					<div className="flex items-center">
						{children}
						<div className="ml-xs inline-flex items-center justify-center">
							<Icon size="sm" name="update" className="animate-spin" />
						</div>
					</div>
				) : (
					children
				)}
			</Comp>
		);
	},
);
Button.displayName = 'Button';

export { Button };
