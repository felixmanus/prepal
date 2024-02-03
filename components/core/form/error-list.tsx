export type ListOfErrors = Array<string | null | undefined> | string | null | undefined;

export function ErrorList({ id, error }: { error?: ListOfErrors; id?: string }) {
	let errorsToRender;

	if (typeof error === 'string') {
		errorsToRender = [error];
	} else if (Array.isArray(error)) {
		errorsToRender = error;
	} else {
		return null;
	}

	return (
		<ul id={id} className="flex flex-col gap-1">
			{errorsToRender.map(e => (
				<li key={e} className="text-red-600 text-body-xs">
					{e}
				</li>
			))}
		</ul>
	);
}
