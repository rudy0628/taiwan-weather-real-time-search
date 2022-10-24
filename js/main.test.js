import fs from 'fs';
import path from 'path';

import { vi, it, describe, beforeEach, expect } from 'vitest';
import { Window } from 'happy-dom';

import {
	changeBg,
	getWeatherIconId,
	addBackgroundImg,
	getWeather,
} from './main.js';

// create document
const htmlDocPath = path.join(process.cwd(), 'index.html');
const htmlDocumentContent = fs.readFileSync(htmlDocPath).toString();

const window = new Window();
const document = window.document;
document.write(htmlDocumentContent);
vi.stubGlobal('document', document);

beforeEach(() => {
	document.body.innerHTML = '';
	document.write(htmlDocumentContent);
});

// http
const testResponseData = {
	name: 'test',
	dt: new Date('2022-10-21'),
	main: {
		temp: 1,
		humidity: 1,
		temp_min: 1,
		temp_max: 1,
	},
	weather: [
		{
			icon: 'test',
			main: 'test',
			id: 1,
		},
	],
	wind: {
		speed: 1,
		deg: 1,
	},
	sys: {
		country: 'test',
		sunset: new Date('2022-10-20'),
		sunrise: new Date('2022-10-22'),
	},
};

const testFetch = vi.fn((url, options) => {
	return new Promise((resolve, reject) => {
		const testResponse = {
			json: () => {
				return new Promise((resolve, reject) => {
					resolve(testResponseData);
				});
			},
		};

		resolve(testResponse);
	});
});

vi.stubGlobal('fetch', testFetch);

describe('getWeatherIconId()', () => {
	it('should return a string if passed into correct id', () => {
		const testId = 2;

		const result = getWeatherIconId(testId);

		expect(result).toBeTypeOf('string');
	});

	it('should return undefined if passed into invalid id', () => {
		const testId = 9;

		const result = getWeatherIconId(testId);

		expect(result).toBe(undefined);
	});
});

describe('addBackgroundImg()', () => {
	it('should change the background image if correct id is passed in', () => {
		const weatherId = 2;

		addBackgroundImg(weatherId);

		const body = document.querySelector('body');

		expect(body.style.backgroundImage).toBeDefined();
		expect(body.style.backgroundPosition).toBe('center');
		expect(body.style.backgroundRepeat).toBe('no-repeat');
		expect(body.style.backgroundSize).toBe('cover');
	});
});

describe('changeBg()', () => {
	it('should change the background color and color if current date exceed sunset or before sunrise', () => {
		const currentDate = new Date('2022-10-21');
		const sunsetDate = new Date('2022-10-20');
		const sunriseDate = new Date('2022-10-22');

		changeBg(currentDate, sunsetDate, sunriseDate);

		const main = document.querySelector('#main');

		expect(main.style.backgroundColor).toBe('rgba(0, 0, 0, 0.7)');
		expect(main.style.color).toBe('white');
	});
});

describe('getWeather()', () => {
	it('should return the right data in response', () => {
		const cityName = 'Taipei';

		return expect(getWeather(cityName)).resolves.toEqual(testResponseData);
	});
});
