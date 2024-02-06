type allKeys<T> = T extends any ? keyof T : never;

type ActionReturnType<T> =
	| {
			status: 'idle' | 'error' | 'success';
			submission: Submission<T>;
	  }
	| {
			status: 'error' | 'success';
			message: string;
			submission?: null;
	  }
	| null
	| undefined;
