import React from 'react';

import { type Metadata } from 'next';

import { PublicHeader } from '@/components/ui/header';

export const metadata: Metadata = {
	title: 'Prepal - Auth needed',
	description: 'Login or Sign up for accessing our products',
};

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div>
			<PublicHeader />
			<main className="h-[calc(100vh-74px)]">{children}</main>
		</div>
	);
}
