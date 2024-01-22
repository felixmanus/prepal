import * as React from 'react';

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/misc';

import { Icon } from '../icon';

const buttonVariants = cva(
	[
		'inline-flex',
		'items-center',
		'rounded-lg',
		'justify-center',
		'disabled:opacity-50',
		'disabled:pointer-events-none',
		'outline-none',
		'transition',
		'ease-in-out',
		'duration-300',
	],
	{
		variants: {
			variant: {
				primary: [
					'text-white',
					'bg-purple-200',
					'hover:bg-purple-300',
					'focus:ring-2',
					'focus:ring-purple-primary',
					'active:ring-0',
					'active:bg-purple-primary',
					'disabled:bg-purple-100',
					'disabled:text-white',
				],
				secondary: [
					'ring-2',
					'ring-purple-200',
					'text-gray-400',
					'hover:text-gray-500',
					'hover:ring-purple-400',
					'focus:text-gray-primary',
					'focus:ring-purple-primary',
					'active:text-purple-primary',
					'active:ring-purple-primary',
					'disabled:text-gray-200',
					'disabled:ring-purple-200',
				],
				link: [
					'text-gray-500',
					'decoration-gray-500',
					'bg-transparent',
					'hover:underline',
					'hover:bg-gray-50',
					'focus:text-gray-primary',
					'focus:ring-2',
					'focus:ring-gray-200',
					'focus:no-underline',
					'active:text-gray-primary',
					'active:no-underline',
					'active:ring-0',
					'active:bg-gray-300',
					'active:text-white',
					'disabled:text-gray-300',
				],
			},
			size: {
				xs: 'py-xxs px-xs text-button-xs h-[1.75rem] max-h-[1.75rem]',
				sm: 'py-xs px-md text-button-sm h-[2.25rem] max-h-[2.25rem]',
				md: 'py-sm px-lg text-button-md h-[2.625rem] max-h-[2.625rem]',
				lg: 'py-sm px-lg text-button-lg h-[3rem] max-h-[3rem]',
			},
		},
		defaultVariants: {
			variant: 'primary',
			size: 'md',
		},
	},
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
	dataTestId?: string;
	status?: 'pending' | 'idle';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ children, className, variant, size, status = 'idle', asChild = false, dataTestId = 'button', ...props }, ref) => {
		const companion = {
			pending: (
				<div className="ml-xs inline-flex items-center justify-center">
					<Icon size="sm" name="update" className="animate-spin" />
				</div>
			),
			idle: null,
		}[status];

		const Comp = asChild ? Slot : 'button';

		return (
			<Comp ref={ref} data-testid={dataTestId} className={cn(buttonVariants({ variant, size, className }))} {...props}>
				{companion ? (
					<div>
						{children}
						{companion}
					</div>
				) : (
					children
				)}
			</Comp>
		);
	},
);
Button.displayName = 'Button';

export { Button, buttonVariants };
