import '@/assets/styles/tailwind.css';

import { type Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Prepal - Dashboard',
	description: 'Here you can do your things',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <div>{children}</div>;
}
