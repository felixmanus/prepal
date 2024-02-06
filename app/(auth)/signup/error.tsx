'use client';

import { Button } from '@/components/core/button';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
	return (
		<div>
			<h2 className="text-h2">Something went wrong! {error.message}</h2>
			<Button variant="secondary" onClick={() => reset()}>
				Try again
			</Button>
		</div>
	);
}
