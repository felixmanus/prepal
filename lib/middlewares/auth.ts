import { LRUCache } from 'lru-cache';

type Options = {
	uniqueTokenPerInterval?: number;
	interval?: number;
};

export default function rateLimit(options?: Options) {
	const tokenCache = new LRUCache({
		max: options?.uniqueTokenPerInterval || 500,
		ttl: options?.interval || 60000,
	});

	return {
		check: (headers: HeadersInit, limit: number, token: string) =>
			new Promise<void>((resolve, reject) => {
				const requestHeaders = new Headers(headers);

				const tokenCount = (tokenCache.get(token) as number[]) || [0];
				if (tokenCount[0] === 0) {
					tokenCache.set(token, tokenCount);
				}
				tokenCount[0] += 1;

				const currentUsage = tokenCount[0];
				const isRateLimited = currentUsage >= limit;

				requestHeaders.set('X-RateLimit-Limit', String(limit));
				requestHeaders.set('X-RateLimit-Remaining', isRateLimited ? '0' : String(limit - currentUsage));

				return isRateLimited ? reject() : resolve();
			}),
	};
}
