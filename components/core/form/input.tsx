'use client';

import * as React from 'react';

import { cn } from '@/utils/misc';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
	return <input type={type} className={cn('input-field', className)} ref={ref} {...props} />;
});
Input.displayName = 'Input';

export { Input };
