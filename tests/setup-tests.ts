import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';
import { type MockInstance, vi, afterEach, beforeEach, expect } from 'vitest';

import { server } from './mocks';

// speeds up *ByRole queries a bit
// https://github.com/testing-library/dom-testing-library/issues/552
configure({ defaultHidden: true });

// Reseting handlers for having clean mock setup for each test case
afterEach(() => server.resetHandlers());

export let consoleError: MockInstance<Parameters<(typeof console)['error']>>;

beforeEach(() => {
	consoleError = vi.spyOn(console, 'error');
	consoleError.mockImplementation(() => {});
});

afterEach(() => {
	expect(
		consoleError,
		'make sure to call mockClear in any test you expect console.error to be called',
	).not.toHaveBeenCalled();
});
