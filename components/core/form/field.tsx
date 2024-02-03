'use client';

import { useId } from 'react';

import { cn } from '@/utils/misc';

import { Icon } from '../icon/index';
import { ErrorList, type ListOfErrors } from './error-list';
import { Input } from './input';
import { Label } from './label';

export function Field({
	name,
	hint,
	errors,
	className,
	labelProps,
	inputProps,
	inputRef,
	loading,
}: {
	hint?: {
		text: string;
		showIcon?: boolean;
	};
	name?: string;
	className?: string;
	errors?: ListOfErrors;
	labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
	inputProps: React.InputHTMLAttributes<HTMLInputElement>;
	inputRef?: React.RefObject<HTMLInputElement>;
	loading?: boolean;
}) {
	const fallbackId = useId();
	const id = inputProps.id ?? fallbackId;
	const errorId = errors?.length ? `${id}-error` : undefined;
	const inputName = name ?? inputProps.name;

	return (
		<div data-testid={`${inputName ?? 'form-field'}`} className={`${className} flex flex-col`}>
			{labelProps && (
				<Label
					htmlFor={id}
					{...labelProps}
					className={`${labelProps.className} flex min-h-[2rem] items-center self-start text-gray-500`}
				/>
			)}

			<div className="relative w-full">
				<Input
					ref={inputRef}
					id={id}
					name={inputName}
					aria-describedby={errorId}
					aria-invalid={errorId ? true : undefined}
					{...inputProps}
					className={cn(`${inputProps.className} w-full`)}
				/>
				{loading && (
					<div
						aria-busy
						role="status"
						aria-live="polite"
						aria-label="Loading"
						data-testid="spinner"
						className="border-top-4 border-top-solid absolute right-[0.75rem] top-[0.75rem] h-[1.25rem] w-[1.25rem] animate-spin rounded-full border-4 border-t-4 border-solid border-[#f3f3f3] border-t-green-primary"
					/>
				)}
			</div>

			{(errorId || hint) && (
				<div role="alert" className="flex min-h-[1rem] flex-col items-start justify-start pl-md">
					{errorId ? <ErrorList id={errorId} error={errors} /> : null}
					{hint ? (
						<div className="flex flex-row items-center justify-between py-1">
							{hint.showIcon && <Icon name="info" className="mr-xs text-gray-400" />}
							<span className="text-body-xs text-gray-400">{hint.text}</span>
						</div>
					) : null}
				</div>
			)}
		</div>
	);
}
