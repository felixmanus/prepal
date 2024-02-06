import { z } from 'zod';

const emailSchema = z
	.string({
		required_error: 'Email is required',
		invalid_type_error: 'Email must be a string',
	})
	.min(5, 'Min length is 5')
	.max(320, 'Max length is 320')
	.email('Please provide a valid email address');

export const loginSchema = z.object({
	email: emailSchema,
	password: z
		.string({
			required_error: 'Password is required',
		})
		.min(8, 'Password should contain at least 8 characters'),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;

export const signupSchema = z.object({
	email: emailSchema,
	passwords: z
		.object({
			password: z.string({ required_error: 'Password is required' }),
			confirmPassword: z.string({ required_error: 'Password is required' }),
		})
		.refine(
			values => {
				return values.password === values.confirmPassword;
			},
			{
				message: 'Passwords must match!',
				path: ['confirmPassword'],
			},
		),
	username: z.string({ required_error: 'Username is required' }).min(3, 'Min length is 3'),
	firstName: z.string({ required_error: 'First name is required' }).min(3, 'Min length is 3'),
	lastName: z.string({ required_error: 'Last name is required' }).min(3, 'Min length is 3'),
});

export type SignupSchemaType = z.infer<typeof signupSchema>;

export const verifyOTPSchema = z.object({
	type: z.enum(['onboarding', 'reset-password']),
	email: emailSchema,
	code: z
		.string({
			required_error: 'Verification code is required',
		})
		.length(6, 'Must be exactly 5 characters long'),
});

export type VerifyOTPSchemaType = z.infer<typeof verifyOTPSchema>;

export const sendOTPSchema = z.object({
	type: z.enum(['onboarding', 'reset-password']),
	email: emailSchema,
});

export type SendOTPSchemaType = z.infer<typeof sendOTPSchema>;
