import * as React from 'react';

import {
	Item,
	Portal,
	Content,
	Trigger,
	ItemText,
	Viewport,
	Separator,
	ItemIndicator,
	type PortalProps,
	type SelectProps,
	type SelectItemProps,
	type SelectValueProps,
	type SelectTriggerProps,
	type SelectContentProps,
	Root as SelectRoot,
	Value as SelectValue,
} from '@radix-ui/react-select';

import { cn } from '@/utils/misc';

import { Icon } from '../icon';
import { ErrorList, type ListOfErrors } from './error-list';
import { Label } from './label';

const SelectTrigger = React.forwardRef<
	React.ElementRef<typeof Trigger>,
	React.ComponentPropsWithoutRef<typeof Trigger>
>((props: SelectTriggerProps & React.RefAttributes<HTMLButtonElement>, ref) => (
	<Trigger
		ref={ref}
		data-testid="select-button"
		className={cn('input-field flex w-full items-center justify-between', props.className)}
		{...props}
	>
		{props.children}
		<Icon size="lg" name="arrow-down" />
	</Trigger>
));
SelectTrigger.displayName = Trigger.displayName;

const SelectContent = React.forwardRef<
	React.ElementRef<typeof Content>,
	React.ComponentPropsWithoutRef<typeof Content> & { container?: PortalProps['container'] }
>(({ className, children, position = 'popper', container, ...props }, ref) => (
	<Portal container={container}>
		<Content
			ref={ref}
			className={cn(
				'relative overflow-hidden rounded-md border bg-white shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
				position === 'popper' &&
					'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
				className,
			)}
			position={position}
			{...props}
		>
			<Viewport
				className={cn(
					'p-1',
					position === 'popper' &&
						'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]',
				)}
			>
				{children}
			</Viewport>
		</Content>
	</Portal>
));
SelectContent.displayName = Content.displayName;

const SelectItem = React.forwardRef<React.ElementRef<typeof Item>, React.ComponentPropsWithoutRef<typeof Item>>(
	(props: SelectItemProps & React.RefAttributes<HTMLDivElement>, ref) => (
		<Item
			ref={ref}
			className={cn(
				'flex h-[2.625rem] max-h-[2.625rem] w-full cursor-default select-none items-center justify-between rounded-sm px-md py-xs outline-none hover:bg-gray-50 focus:bg-gray-50 data-[disabled]:pointer-events-none',
				props.className,
			)}
			{...props}
			data-testid="select-item"
		>
			<ItemText className="flex-grow">{props.children}</ItemText>
			<span className="items-center justify-center">
				<ItemIndicator>
					<Icon name="trash" size="sm" />
				</ItemIndicator>
			</span>
		</Item>
	),
);
SelectItem.displayName = Item.displayName;

const SelectSeparator = React.forwardRef<
	React.ElementRef<typeof Separator>,
	React.ComponentPropsWithoutRef<typeof Separator>
>(({ className, ...props }, ref) => (
	<Separator ref={ref} className={cn('bg-muted -mx-1 my-1 h-px', className)} {...props} />
));
SelectSeparator.displayName = Separator.displayName;

export const Select = ({
	id,
	name,
	items,
	errors,
	disabled,
	className,
	rootProps,
	inputProps,
	labelProps,
	placeholder,
	triggerProps,
	contentProps,
}: {
	id?: string;
	name?: string;
	disabled?: boolean;
	className?: string;
	placeholder: string;
	errors?: ListOfErrors;
	rootProps?: SelectProps;
	inputProps?: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
	labelProps: React.LabelHTMLAttributes<HTMLLabelElement>;
	valueProps?: SelectValueProps & React.RefAttributes<HTMLSpanElement>;
	triggerProps?: SelectTriggerProps & React.RefAttributes<HTMLButtonElement>;
	contentProps?: SelectContentProps & { container?: PortalProps['container'] };
	items: Array<SelectItemProps & React.RefAttributes<HTMLDivElement> & { label: string }>;
}) => {
	const fallbackId = React.useId();
	const inputId = id ?? fallbackId;
	const errorId = errors?.length ? `${inputId}-error` : undefined;

	return (
		<div data-testid="select-field" className={`${className} flex flex-col`}>
			<input hidden {...inputProps} />
			<Label
				htmlFor={inputId}
				{...labelProps}
				className={`${labelProps.className} flex min-h-[2rem] items-center self-start text-gray-600`}
			/>
			<SelectRoot {...rootProps} disabled={disabled} name={name}>
				<SelectTrigger
					{...triggerProps}
					aria-label={placeholder}
					id={inputId}
					aria-invalid={errorId ? true : undefined}
				>
					<SelectValue placeholder={placeholder} />
				</SelectTrigger>
				<SelectContent {...contentProps}>
					<div className="max-h-[25rem] overflow-auto">
						{items.map(({ value, label, ...rest }) => (
							<SelectItem key={value} value={value} {...rest}>
								{label}
							</SelectItem>
						))}
					</div>
				</SelectContent>
			</SelectRoot>
			{errorId && (
				<div role="alert" className="min-h-[1rem] pl-md">
					<ErrorList id={errorId} error={errors} />
				</div>
			)}
		</div>
	);
};
