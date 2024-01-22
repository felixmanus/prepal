import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

import { extendedTheme } from './extended-theme';

/**
 * Provide a condition and if that condition is falsey, this throws an error
 * with the given message.
 *
 * inspired by invariant from 'tiny-invariant' except will still include the
 * message in production.
 *
 * @example
 * invariant(typeof value === 'string', `value must be a string`)
 *
 * @param condition The condition to check
 * @param message The message to throw (or a callback to generate the message)
 * @param responseInit Additional response init options if a response is thrown
 *
 * @throws {Error} if condition is falsey
 */
export const invariant = (condition: any, message: string | (() => string)) => {
	if (!condition) {
		throw new Error(typeof message === 'function' ? message() : message);
	}
};

const formatColors = () => {
	const colors = [];
	for (const [key, color] of Object.entries(extendedTheme.colors)) {
		if (typeof color === 'string') {
			colors.push(key);
		} else {
			const colorGroup = Object.keys(color).map(subKey => (subKey === 'DEFAULT' ? '' : subKey));
			colors.push({ [key]: colorGroup });
		}
	}
	return colors;
};

const customTwMerge = extendTailwindMerge({
	extend: {
		theme: {
			colors: formatColors(),
			borderRadius: Object.keys(extendedTheme.borderRadius),
			spacing: Object.keys(extendedTheme.spacing),
		},
		classGroups: {
			'font-size': [
				{
					text: Object.keys(extendedTheme.fontSize),
				},
			],
		},
	},
});

export function cn(...inputs: ClassValue[]) {
	return customTwMerge(clsx(inputs));
}
