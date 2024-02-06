'use client';

import { useEffect } from 'react';

import { useForm, conform } from '@conform-to/react';
import { getFieldsetConstraint, parse } from '@conform-to/zod';
import cookies from 'js-cookie';
import { useFormState } from 'react-dom';

import { Button } from '@/components/core/button';
import { Field } from '@/components/core/form/field';
import { useToast } from '@/components/core/toast/use-toast';

import { signIn } from '@/lib/actions/auth';
import { loginSchema } from '@/lib/validations/auth';

export default function Login() {
	const { toast } = useToast();
	const [state, formAction] = useFormState(signIn, null);

	const toastData = JSON.parse(cookies.get('toast') || '{}');

	const [form, fields] = useForm({
		id: 'login-form',
		lastSubmission: state?.submission,
		constraint: getFieldsetConstraint(loginSchema),
		onValidate({ formData }) {
			return parse(formData, { schema: loginSchema });
		},
		defaultValue: {
			email: '',
			password: '',
		},
		shouldValidate: 'onSubmit',
		shouldRevalidate: 'onInput',
	});

	useEffect(() => {
		if (state?.status === 'error' && 'message' in state) {
			toast({
				title: state.message,
				variant: 'error',
			});
		}

		if (toastData.variant) {
			toast(toastData);
			cookies.remove('toast');
		}
	}, [state, toastData.variant]);

	return (
		<section className="flex items-center justify-center h-full ">
			<div className="p-xl shadow-lg rounded-md border border-slate-50 max-w-[30rem] basis-[30rem] bg-white">
				<header className="mb-xl">
					<h3 className="text-h3">Sign in to Prepal</h3>
				</header>
				<section>
					<form action={formAction} {...form.props} className="flex flex-col">
						<Field
							labelProps={{ children: 'Email' }}
							inputProps={{
								placeholder: 'Enter your email address',
								...conform.input(fields.email),
							}}
							className="pb-xl"
							errors={fields.email.errors}
						/>
						<Field
							labelProps={{ children: 'Password' }}
							inputProps={{
								type: 'password',
								placeholder: 'Enter your password',
								...conform.input(fields.password),
							}}
							className="pb-xl"
							errors={fields.password.errors}
						/>
						<Button>Sign in</Button>
					</form>
				</section>
			</div>
		</section>
	);
}
