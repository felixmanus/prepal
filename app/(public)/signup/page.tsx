import Link from 'next/link';

export default function Signup() {
	return (
		<div>
			<header>Some header Sign up</header>
			<section>
				<div>
					<span>Already have an account?</span>
					<Link href="/login">Login</Link>
				</div>
			</section>
		</div>
	);
}
