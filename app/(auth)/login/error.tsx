'use client';

import { Button } from '@/components/core/button';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
	return (
		<div className="h-full flex items-center justify-center">
			<div className="flex rounded-md flex-col items-center justify-center w-[40%] bg-white shadow-md border border-gray-50 p-lg min-h-[20rem]">
				<h2 className="text-h2 mb-md">Something went wrong!</h2>
				<Button onClick={() => reset()}>Try again</Button>
			</div>
		</div>
	);
}
