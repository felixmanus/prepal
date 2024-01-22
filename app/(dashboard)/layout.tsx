import '@/assets/styles/tailwind.css';

import { type Metadata } from 'next';
import { Inter } from 'next/font/google';

import { PreloadResources } from '../preload-resources';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Prepal - Dashboard',
	description: 'Here you can do your things',
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
