import { type ZodError } from 'zod';

export const getConvertedFormdata = <T extends string>(
	keys: T[],
	formData: FormData,
): Record<T, FormDataEntryValue | null> => {
	return keys.reduce(
		(result, key) => {
			const value = formData.get(key);
			if (value !== null && value !== undefined) {
				result[key] = String(value);
			}
			return result;
		},
		{} as Record<T, FormDataEntryValue | null>,
	);
};

export const getFieldErrors = <T>(zodError: ZodError<T>): { [K in allKeys<T>]?: string } => {
	const fieldErrors = zodError.flatten().fieldErrors;

	return Object.keys(fieldErrors).reduce(
		(result, field) => {
			const fieldName = field as allKeys<T>;
			if (fieldErrors[fieldName]) {
				result[fieldName] = fieldErrors[fieldName]?.[0];
			}
			return result;
		},
		{} as { [K in allKeys<T>]?: string },
	);
};
