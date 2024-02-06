'use client';

import React from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Icon } from '@/components/core/icon';

import { logout } from '@/lib/actions/auth';

export default function DashLayout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();

	return (
		<div className="flex h-screen">
			<nav className="flex py-lg flex-col bg-white grow-[1] shrink-0 shadow-lg w-[14rem] max-w-[14rem]">
				<header className="mb-16  px-lg">
					<h2 className="text-h2">Prepal</h2>
				</header>
				<ul className="list-none max-w-[100%] w-[100%]">
					<li className={`nav-item ${pathname.startsWith('/app/dashboard') ? 'active' : ''}`}>
						<Link href="/app/dashboard" className="nav-anchor">
							<Icon name="dash" />
							<span>Dashboard</span>
						</Link>
					</li>
					<li className={`nav-item ${pathname.startsWith('/app/topics') ? 'active' : ''}`}>
						<Link href="/app/topics" className="nav-anchor">
							<Icon name="reader" />
							<span>Topics</span>
						</Link>
					</li>
					<li className={`nav-item ${pathname.startsWith('/app/interviews') ? 'active' : ''}`}>
						<Link href="/app/interviews" className="nav-anchor">
							<Icon name="transform" />
							<span>Interviews</span>
						</Link>
					</li>
					<li className={`nav-item ${pathname.startsWith('/app/account') ? 'active' : ''}`}>
						<Link href="/app/account" className="nav-anchor">
							<Icon name="avatar" />
							<span>Account</span>
						</Link>
					</li>
				</ul>
				<footer className="mt-auto">
					<div className="nav-item">
						<div className="nav-anchor" onClick={() => logout()}>
							<Icon name="exit" />
							<span>Sign out</span>
						</div>
					</div>
				</footer>
			</nav>
			<main className="bg-violet-50 grow-[6] overflow-hidden">{children}</main>
		</div>
	);
}
