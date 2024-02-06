'use client';

import { useEffect } from 'react';

import { useForm, conform, useFieldset } from '@conform-to/react';
import { getFieldsetConstraint, parse } from '@conform-to/zod';
import { useFormState } from 'react-dom';

import { Button } from '@/components/core/button';
import { Field } from '@/components/core/form/field';
import { useToast } from '@/components/core/toast/use-toast';

import { signUp } from '@/lib/actions/auth';
import { signupSchema } from '@/lib/validations/auth';

export default function Signup() {
	const { toast } = useToast();
	const [state, formAction] = useFormState(signUp, null);

	const [form, fields] = useForm({
		id: 'signup-form',
		lastSubmission: state?.submission,
		constraint: getFieldsetConstraint(signupSchema),
		onValidate({ formData }) {
			return parse(formData, { schema: signupSchema });
		},
		shouldValidate: 'onSubmit',
		shouldRevalidate: 'onInput',
	});
	const { password, confirmPassword } = useFieldset(form.ref, fields.passwords);

	useEffect(() => {
		if (state?.status === 'error' && 'message' in state) {
			toast({
				variant: 'error',
				title: state.message,
			});
		}
	}, [state]);

	return (
		<section className="flex items-center justify-center h-full">
			<div className="p-xl rounded-md shadow-lg border border-solid bg-white border-slate-50 max-w-[30rem] basis-[30rem] max-h-[80%] overflow-x-hidden flex flex-col">
				<header className="mb-xl">
					<h3 className="text-h3">Sign up for free</h3>
				</header>
				<section className="h-full max-h-full">
					<form {...form.props} action={formAction} className="flex flex-col">
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
							labelProps={{ children: 'Username' }}
							inputProps={{
								placeholder: 'Enter your username',
								...conform.input(fields.username),
							}}
							className="pb-xl"
							errors={fields.username.errors}
						/>
						<Field
							labelProps={{ children: 'First name' }}
							inputProps={{
								placeholder: 'Enter your first name',
								...conform.input(fields.firstName),
							}}
							className="pb-xl"
							errors={fields.firstName.errors}
						/>
						<Field
							labelProps={{ children: 'Last name' }}
							inputProps={{
								placeholder: 'Enter your last name',
								...conform.input(fields.lastName),
							}}
							className="pb-xl"
							errors={fields.lastName.errors}
						/>
						<Field
							labelProps={{ children: 'Password' }}
							inputProps={{
								type: 'password',
								placeholder: 'Enter your password',
								...conform.input(password),
							}}
							className="pb-xl"
							errors={password.errors}
						/>
						<Field
							labelProps={{ children: 'Confirm password' }}
							inputProps={{
								type: 'password',
								placeholder: 'Confirm your password',
								...conform.input(confirmPassword),
							}}
							className="pb-xl"
							errors={confirmPassword.errors}
						/>
						<Button>Sign up</Button>
					</form>
				</section>
			</div>
		</section>
	);
}
