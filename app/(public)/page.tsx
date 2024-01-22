import Image from 'next/image';

import { Button } from '@/components/core/button';

export default function AuthHome() {
	return (
		<section className="relative h-full grd-lighter flex justify-between items-center">
			<div className="w-[50rem] ml-xxl">
				<h2 className="text-h2 mb-xxs">Prepare yourself for everything seamlessly in one place</h2>
				<p>
					<span className="text-body-md">Prepal will help you combine your preparation stuff. </span>
					<span className="text-body-md">Simply create topics and learn them step by step. </span>
					<span className="text-body-md">Enjoy the convenience of accessing the topic content by voice.</span>
				</p>
				<Button className="mt-lg">Short demo</Button>
			</div>
			<Image
				priority
				src="/images/prepare.svg"
				style={{
					width: '50%',
					height: '50%',
				}}
				width={500}
				height={500}
				alt="Preparation"
			/>
		</section>
	);
}
