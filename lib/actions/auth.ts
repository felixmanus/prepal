'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { type Submission } from '@conform-to/dom';
import { parse } from '@conform-to/zod';
import { z } from 'zod';

import { handleLogin, handleVerification, isCodeValid } from '@/utils/auth';
import { createPassword } from '@/utils/db-utils';
import { handlePrismaErrors } from '@/utils/prisma';
import { prisma } from '@/utils/prisma-client';

import {
	loginSchema,
	type LoginSchemaType,
	signupSchema,
	type SignupSchemaType,
	type VerifyOTPSchemaType,
	verifyOTPSchema,
	type SendOTPSchemaType,
	sendOTPSchema,
} from '@/lib/validations/auth';

import { sendEmail } from '../misc/email-sender';

export type ActionReturnType<T> =
	| {
			status: 'idle' | 'error' | 'success';
			submission: Submission<T>;
	  }
	| {
			status: 'error' | 'success';
			message: string;
			submission?: null;
	  }
	| null
	| undefined;

export async function signIn(
	_: ActionReturnType<LoginSchemaType>,
	formData: FormData,
): Promise<ActionReturnType<LoginSchemaType>> {
	const submission = parse(formData, { schema: loginSchema });

	// get the password off the payload that's sent back
	delete submission.payload.password;

	if (submission.intent !== 'submit') {
		// @ts-expect-error - conform should probably have support for doing this
		delete submission.value?.password;
		return { status: 'idle', submission };
	}
	if (!submission.value) {
		return { status: 'error', submission };
	}

	try {
		const session = await handleLogin(submission.value);

		if (!session) {
			return { status: 'error', message: 'Invalid user credentials' };
		}

		cookies().set('__session', session.id, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			maxAge: 60 * 60 * 24 * 7, // One week
			path: '/',
		});
	} catch (err) {
		handlePrismaErrors(err);
	}

	redirect('/app/dashboard');
}

export async function logout() {
	const sessionId = cookies().get('__session')?.value;

	try {
		if (sessionId) {
			await prisma.session.deleteMany({
				where: {
					id: sessionId,
				},
			});
		}
	} catch (err) {
		handlePrismaErrors(err);
	}

	cookies().set('__session', '', { maxAge: 0 });

	redirect('/login');
}

export async function signUp(
	_: ActionReturnType<SignupSchemaType>,
	formData: FormData,
): Promise<ActionReturnType<SignupSchemaType>> {
	const submission = parse(formData, { schema: signupSchema });

	if (submission.intent !== 'submit') {
		return { status: 'idle', submission };
	}
	if (!submission.value) {
		return { status: 'error', submission };
	}

	const { passwords, ...rest } = submission.value;

	let mailResponse;

	try {
		// Check if the users exists
		const existingUser = await prisma.user.findUnique({
			where: {
				email: rest.email,
			},
		});

		if (existingUser) {
			return { status: 'error', message: 'User already exists!' };
		}

		const { otp } = await handleVerification({
			type: 'onboarding',
			target: rest.email,
			period: 60 * 10,
		});

		mailResponse = await sendEmail({
			otp,
			to: rest.email,
			subject: 'Welcome to Prepal',
		});

		await prisma.user.create({
			data: { ...rest, verified: false, password: { create: createPassword(passwords.password) } },
		});
	} catch (err) {
		handlePrismaErrors(err);
	}

	if (mailResponse?.status === 'success') {
		cookies().set('__verification', JSON.stringify({ email: rest.email, type: 'onboarding' }));
		redirect('/verify');
	} else {
		submission.error[''] = [mailResponse?.error.message || 'Something went wrong, please try again later'];
		return { status: 'error', submission };
	}
}

export async function sendOTPAgain(
	_: ActionReturnType<SendOTPSchemaType>,
	formData: FormData,
): Promise<ActionReturnType<SendOTPSchemaType>> {
	const submission = parse(formData, { schema: sendOTPSchema });

	if (!submission.value) {
		return { status: 'error', submission };
	}

	const { email, type } = submission.value;
	let mailResponse;

	try {
		const { otp } = await handleVerification({
			type,
			target: email,
			period: 60 * 10,
		});

		mailResponse = await sendEmail({
			otp,
			to: email,
			subject: 'Welcome to Prepal',
		});
	} catch (err) {
		console.log(err, 'err sendOtp');
		handlePrismaErrors(err);
	}

	if (mailResponse?.status === 'success') {
		cookies().set('__verification', JSON.stringify({ email, type }));
		return { status: 'success', message: 'We have successfully sent the verification code.' };
	} else {
		submission.error[''] = [mailResponse?.error.message || 'Something went wrong, please try again later'];
		return { status: 'error', submission };
	}
}

export async function verifyOTP(
	_: ActionReturnType<VerifyOTPSchemaType>,
	formData: FormData,
): Promise<ActionReturnType<VerifyOTPSchemaType>> {
	const submission = await parse(formData, {
		schema: verifyOTPSchema.superRefine(async (data, ctx) => {
			const codeIsValid = await isCodeValid({
				code: data.code,
				type: data.type,
				target: data.email,
			});
			if (!codeIsValid) {
				ctx.addIssue({
					path: ['code'],
					code: z.ZodIssueCode.custom,
					message: `Invalid code`,
				});
				return;
			}
		}),
		async: true,
	});

	if (submission.intent !== 'submit') {
		return { status: 'idle', submission };
	}
	if (!submission.value) {
		return { status: 'error', submission };
	}

	const { email } = submission.value;

	await prisma.verification.delete({
		where: {
			target_type: {
				type: 'onboarding',
				target: email,
			},
		},
	});

	await prisma.user.update({
		where: {
			email,
		},
		data: { verified: true },
	});

	cookies().set(
		'toast',
		JSON.stringify({
			variant: 'success',
			title: 'Account Created Successfully! 🎉',
			description: 'Please log in to access your new account. Welcome aboard!',
		}),
	);

	redirect('/login');
}
