import { type ReactElement } from 'react';

import * as E from '@react-email/components';
import { z } from 'zod';

const resendErrorSchema = z.union([
	z.object({
		name: z.string(),
		message: z.string(),
		statusCode: z.number(),
	}),
	z.object({
		name: z.literal('UnknownError'),
		message: z.literal('Unknown Error'),
		statusCode: z.literal(500),
		cause: z.any(),
	}),
]);
type ResendError = z.infer<typeof resendErrorSchema>;

const resendSuccessSchema = z.object({
	id: z.string(),
});

export async function sendEmail({
	react,
	otp,
	...options
}: {
	otp: string;
	to: string;
	subject: string;
} & ({ html: string; text: string; react?: never } | { react?: ReactElement; html?: never; text?: never })) {
	const from = 'service@prepal.us';

	const email = {
		from,
		...options,
		...(react ? await renderReactEmail(react) : await renderReactEmail(<SignupEmail otp={otp} />)),
	};

	// feel free to remove this condition once you've set up resend
	if (!process.env.RESEND_API_KEY && !process.env.MOCKS) {
		console.error(`RESEND_API_KEY not set and we're not in mocks mode.`);
		console.error(`To send emails, set the RESEND_API_KEY environment variable.`);
		console.error(`Would have sent the following email:`, JSON.stringify(email));
		return {
			status: 'success',
			data: { id: 'mocked' },
		} as const;
	}

	const response = await fetch('https://api.resend.com/emails', {
		method: 'POST',
		body: JSON.stringify(email),
		headers: {
			Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
			'Content-Type': 'application/json',
		},
	});
	const data = await response.json();
	const parsedData = resendSuccessSchema.safeParse(data);

	if (response.ok && parsedData.success) {
		return {
			status: 'success',
			data: parsedData,
		} as const;
	} else {
		const parseResult = resendErrorSchema.safeParse(data);
		if (parseResult.success) {
			return {
				status: 'error',
				error: parseResult.data,
			} as const;
		} else {
			return {
				status: 'error',
				error: {
					name: 'UnknownError',
					message: 'Unknown Error',
					statusCode: 500,
					cause: data,
				} satisfies ResendError,
			} as const;
		}
	}
}

async function renderReactEmail(react: ReactElement) {
	const [html, text] = await Promise.all([E.renderAsync(react), E.renderAsync(react, { plainText: true })]);
	return { html, text };
}

export function SignupEmail({ otp }: { otp: string }) {
	return (
		<E.Html lang="en" dir="ltr">
			<E.Container>
				<h1>
					<E.Text>Welcome to Prepal!</E.Text>
				</h1>
				<p>
					<E.Text>
						Here&#39;s your verification code: <strong>{otp}</strong>
					</E.Text>
				</p>
			</E.Container>
		</E.Html>
	);
}