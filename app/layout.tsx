import '@/assets/styles/tailwind.css';

import { type Metadata } from 'next';
import { Inter } from 'next/font/google';

import { PreloadResources } from './preload-resources';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Prepal - Prepare yourself for everything',
	description:
		'Prepal is an all-in one software for preparing individuals for interviews,meetings and for a lot of things',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<PreloadResources />
			<body className={`${inter.className} scroll-smooth antialiased`}>{children}</body>
		</html>
	);
}
