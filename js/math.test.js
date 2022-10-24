import { it, expect } from 'vitest';
import { FahrenheitToCelsius } from './math.js';

it('should return the number if number of type number is provided', () => {
	const testTemp = 299;

	const result = FahrenheitToCelsius(testTemp);

	expect(result).toBeTypeOf('number');
});

it('should return the number if number of type string is provided', () => {
	const testTemp = '299';

	const result = FahrenheitToCelsius(testTemp);

	expect(result).toBeTypeOf('number');
});

it('should return 0 if the number is null or empty', () => {
	const testTemp1 = null;
	const testTemp2 = '';

	const result1 = FahrenheitToCelsius(testTemp1);
	const result2 = FahrenheitToCelsius(testTemp2);

	expect(result1).toBe(-274);
	expect(result2).toBe(-274);
});

it('should return NaN if the number is invalid', () => {
	const testTemp1 = undefined;
	const testTemp2 = 'invalid';
	const testTemp3 = {};

	const result1 = FahrenheitToCelsius(testTemp1);
	const result2 = FahrenheitToCelsius(testTemp2);
	const result3 = FahrenheitToCelsius(testTemp3);

	expect(result1).toBe(NaN);
	expect(result2).toBe(NaN);
	expect(result3).toBe(NaN);
});
