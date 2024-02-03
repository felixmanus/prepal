'use client';

import { type ToastProviderProps, type ToastViewportProps } from '@radix-ui/react-toast';

import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from './toast';
import { useToast } from './use-toast';

export function Toaster({ viewport, provider }: { viewport?: ToastViewportProps; provider?: ToastProviderProps }) {
	const { toasts } = useToast();

	return (
		<ToastProvider {...provider}>
			{toasts.map(function ({ id, title, description, action, ...props }) {
				return (
					<Toast type="foreground" key={id} {...props}>
						<div className="grid gap-1">
							{title && <ToastTitle>{title}</ToastTitle>}
							{description && <ToastDescription>{description}</ToastDescription>}
						</div>
						{action}
						<ToastClose />
					</Toast>
				);
			})}
			<ToastViewport {...viewport} />
		</ToastProvider>
	);
}
