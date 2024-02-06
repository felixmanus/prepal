import { type NextRequest, NextResponse } from 'next/server';

// import rateLimit from './lib/middlewares/auth';

// const limiter = rateLimit({
// 	interval: 60 * 1000, // 60 seconds
// 	uniqueTokenPerInterval: 500, // Max 500 users per second
// });

export async function middleware(request: NextRequest) {
	const session = request.cookies.get('__session')?.value;

	if (session && !request.nextUrl.pathname.startsWith('/app')) {
		return NextResponse.redirect(new URL('/app/dashboard', request.url));
	}

	if (session && request.nextUrl.pathname === '/app') {
		return NextResponse.redirect(new URL('/app/dashboard', request.url));
	}

	if (!session && request.nextUrl.pathname.startsWith('/app')) {
		return NextResponse.redirect(new URL('/login', request.url));
	}

	const requestHeaders = new Headers(request.headers);
	requestHeaders.set('x-url', request.url);

	return NextResponse.next({
		request: {
			// Apply new request headers
			headers: requestHeaders,
		},
	});

	// try {
	// 	const headers = new Headers(request.headers);
	// 	await limiter.check(headers, 10, 'CACHE_TOKEN'); // 10 requests per minute
	// 	return NextResponse.next({ headers });
	// } catch (err) {
	// 	console.log(err, 'err');
	// 	return NextResponse.json({ status: 'error', error: 'Rate limit exceeded' }, { status: 429 });
	// }
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|.*\\.svg$|.*\\.png$).*)'],
};
