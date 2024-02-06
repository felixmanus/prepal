import * as React from 'react';

import { cn } from '@/utils/misc';

import { ErrorList, type ListOfErrors } from './error-list';
import { Label } from './label';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
	return <textarea className={cn('textarea-field', className)} ref={ref} {...props} />;
});
Textarea.displayName = 'Textarea';

export function TextareaField({
	labelProps,
	textareaProps,
	errors,
	className,
}: {
	labelProps: React.LabelHTMLAttributes<HTMLLabelElement>;
	textareaProps: React.InputHTMLAttributes<HTMLTextAreaElement>;
	errors?: ListOfErrors;
	className?: string;
}) {
	const fallbackId = React.useId();
	const id = textareaProps.id ?? textareaProps.name ?? fallbackId;
	const errorId = errors?.length ? `${id}-error` : undefined;
	return (
		<div className={`${className} flex flex-col`}>
			<Label
				htmlFor={id}
				{...labelProps}
				className={`${labelProps.className} flex min-h-[2rem] items-center self-start text-gray-600`}
			/>
			<Textarea id={id} aria-invalid={errorId ? true : undefined} aria-describedby={errorId} {...textareaProps} />
			{errorId && (
				<div className="min-h-[32px] px-4 pb-3 pt-1">{errorId ? <ErrorList id={errorId} error={errors} /> : null}</div>
			)}
		</div>
	);
}
