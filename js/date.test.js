import { it, expect } from 'vitest';
import { formatDate } from './date.js';

it('should return the correct format if the input is new Date', () => {
	const date = '2022-10-21';
	const testDate = new Date(date);

	const result = formatDate(testDate);

	expect(result).toBe(date);
});
