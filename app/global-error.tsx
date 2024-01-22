'use client';

import { Button } from '@/components/core/button';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
	return (
		<html>
			<body>
				<h2 className="text-h2">Something went wrong!</h2>
				<Button variant="secondary" onClick={() => reset()}>
					Try again
				</Button>
			</body>
		</html>
	);
}
