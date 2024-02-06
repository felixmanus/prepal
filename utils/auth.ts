import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { generateTOTP, verifyTOTP } from '@epic-web/totp';
import { type Password, type User } from '@prisma/client';
import bcrypt from 'bcrypt';

import { prisma } from './prisma-client';

export const SESSION_EXPIRATION_TIME = 1000 * 60 * 60 * 24 * 30;
export const getSessionExpirationDate = () => new Date(Date.now() + SESSION_EXPIRATION_TIME);

export async function handleVerification({
	period,
	target,
	type,
}: {
	period: number;
	target: string;
	type: VerificationTypes;
}) {
	const { otp, ...verificationConfig } = generateTOTP({
		algorithm: 'SHA256',
		// Leaving off 0 and O on purpose to avoid confusing users.
		charSet: 'ABCDEFGHIJKLMNPQRSTUVWXYZ123456789',
		period,
	});

	const verificationData = {
		type,
		target,
		...verificationConfig,
		expiresAt: new Date(Date.now() + verificationConfig.period * 1000),
	};

	await prisma.verification.upsert({
		where: { target_type: { target, type } },
		create: verificationData,
		update: verificationData,
	});

	return { otp };
}

export async function handleLogin({ email, password }: { email: User['email']; password: string }) {
	const currentSession = cookies().get('__session')?.value;

	if (currentSession) {
		redirect('/app/dashboard');
	}

	const user = await verifyUserPassword({ email }, password);

	if (!user) return null;

	let session;

	const checkSession = await prisma.session.findUnique({ where: { userId: user.id }, select: { id: true } });

	if (checkSession?.id) {
		// This is the case when the user cookie is somehow deleted but the session in our DB exists
		session = await prisma.session.update({
			where: { id: checkSession.id },
			data: {
				expirationDate: getSessionExpirationDate(),
				userId: user.id,
			},
		});
	} else {
		session = await prisma.session.create({
			select: { id: true, expirationDate: true, userId: true },
			data: {
				expirationDate: getSessionExpirationDate(),
				userId: user.id,
			},
		});
	}

	return session;
}

export async function verifyUserPassword(where: Pick<User, 'email'> | Pick<User, 'id'>, password: Password['hash']) {
	const userWithPassword = await prisma.user.findUnique({
		where,
		select: { id: true, password: { select: { hash: true } } },
	});

	if (!userWithPassword || !userWithPassword.password) {
		return null;
	}

	const isValid = await bcrypt.compare(password, userWithPassword.password.hash);

	if (!isValid) {
		return null;
	}

	return { id: userWithPassword.id };
}

export async function isCodeValid({ code, type, target }: { code: string; type: VerificationTypes; target: string }) {
	const verification = await prisma.verification.findUnique({
		where: {
			target_type: { target, type },
			OR: [{ expiresAt: { gt: new Date() } }, { expiresAt: null }],
		},
		select: { algorithm: true, secret: true, period: true, charSet: true },
	});
	if (!verification) return false;
	const result = verifyTOTP({
		otp: code,
		...verification,
	});
	if (!result) return false;

	return true;
}
