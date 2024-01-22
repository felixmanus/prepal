import { Field } from '@/components/core/form/field';

export default function Login() {
	return (
		<section className="flex items-center justify-center h-full">
			<div className="p-xl shadow-lg border border-solid border-gray-25 min-w-[30rem]">
				<header>
					<h3 className="text-h3">Sign in to Prepal</h3>
				</header>
				<section>
					<form>
						<Field
							labelProps={{ children: 'Email' }}
							inputProps={{
								placeholder: 'Enter your email address',
							}}
							className="pb-xl"
						/>
						<Field
							labelProps={{ children: 'Password' }}
							inputProps={{
								placeholder: 'Enter your password',
							}}
							className="pb-xl"
						/>
					</form>
				</section>
			</div>
		</section>
	);
}
