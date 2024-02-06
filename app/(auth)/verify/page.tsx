'use client';

import { useEffect } from 'react';

import { useForm, conform } from '@conform-to/react';
import { getFieldsetConstraint, parse } from '@conform-to/zod';
import cookies from 'js-cookie';
import { useFormState } from 'react-dom';

import { Button } from '@/components/core/button';
import { Field } from '@/components/core/form/field';
import { useToast } from '@/components/core/toast/use-toast';

import { sendOTPAgain, verifyOTP } from '@/lib/actions/auth';
import { verifyOTPSchema } from '@/lib/validations/auth';

export default function Verify() {
	const { toast } = useToast();

	const [verificationState, verificationAction] = useFormState(verifyOTP, null);
	const [otpResendState, sendOTPAction] = useFormState(sendOTPAgain, null);

	const parsedCookies = JSON.parse(cookies.get('__verification') || '{}');

	const [form, fields] = useForm({
		id: 'otp-verification-form',
		lastSubmission: verificationState?.submission,
		constraint: getFieldsetConstraint(verifyOTPSchema),
		onValidate({ formData }) {
			return parse(formData, { schema: verifyOTPSchema });
		},
		defaultValue: {
			code: '',
		},
		shouldValidate: 'onSubmit',
		shouldRevalidate: 'onInput',
	});

	useEffect(() => {
		if (otpResendState && 'message' in otpResendState) {
			toast({
				variant: otpResendState.status,
				title: otpResendState.message,
			});
		}
	}, [otpResendState]);

	return (
		<section className="flex items-center justify-center h-full">
			<div className="p-xl rounded-md shadow-lg max-w-[30rem] basis-[30rem] bg-white border border-slate-50">
				<header className="mb-xl flex flex-col">
					<h2 className="text-h2">Check your email</h2>
					<span>
						We've sent a confirmation code to <strong>{parsedCookies.email}</strong>.
					</span>
					<span>Please enter it below to confirm your email address.</span>
				</header>
				<section>
					<form action={verificationAction} {...form.props} className="flex flex-col">
						<Field
							labelProps={{ children: 'Verification code' }}
							inputProps={{
								placeholder: 'Enter confirmation code',
								...conform.input(fields.code),
							}}
							className="pb-xl"
							errors={fields.code.errors}
						/>
						<input type="hidden" value={parsedCookies.email ?? ''} name="email" />
						<input type="hidden" value={parsedCookies.type ?? ''} name="type" />
						<Button>Confirm</Button>
					</form>
				</section>
				<section className="mt-xl flex items-center">
					<p>Didn't receive the code?</p>
					<Button
						variant="link"
						className="h-auto hover:bg-transparent focus:outline-none focus:ring-0 focus:underline active:ring-0 ml-auto"
						onClick={() => {
							const data = new FormData();
							data.append('email', parsedCookies.email);
							data.append('type', parsedCookies.type);
							sendOTPAction(data);
						}}
					>
						Send again
					</Button>
				</section>
			</div>
		</section>
	);
}
