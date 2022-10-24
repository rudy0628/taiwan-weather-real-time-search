import fs from 'fs';
import path from 'path';

import { vi, it, describe, beforeEach, expect } from 'vitest';
import { Window } from 'happy-dom';

import {
	addTemp,
	addDate,
	addDescription,
	addHumidity,
	addIcon,
	addLocation,
	addTempMinMax,
	addWind,
} from './addElement.js';

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

// temp
describe('addTemp()', () => {
	it('temp element should not be null when addTemp called', () => {
		addTemp(299);

		const temp = document.querySelector('.temp');
		const tempContent = temp.textContent;

		expect(tempContent).not.toBeNull();
	});

	it('temp element should not be empty string when addTemp called', () => {
		addTemp(299);

		const temp = document.querySelector('.temp');
		const tempContent = temp.textContent;

		expect(tempContent).not.toBe('');
	});
});

// date
describe('addDate()', () => {
	it('date element should not be null when addDate called', () => {
		addDate(new Date());

		const date = document.querySelector('#date');
		const dateContent = date.textContent;

		expect(dateContent).not.toBeNull();
	});

	it('date element should not be empty string when addDate called', () => {
		addDate(new Date());

		const date = document.querySelector('#date');
		const dateContent = date.textContent;

		expect(dateContent).not.toBe('');
	});
});

// description
describe('addDescription()', () => {
	it('description element should not be null when addDescription called', () => {
		addDescription('test');

		const description = document.querySelector('.description');
		const descriptionContent = description.textContent;

		expect(descriptionContent).not.toBeNull();
	});

	it('description element should not be empty string when addDescription called', () => {
		addDescription('test');

		const description = document.querySelector('.description');
		const descriptionContent = description.textContent;

		expect(descriptionContent).not.toBe('');
	});
});

// humidity
describe('addHumidity()', () => {
	it('humidity element should not be null when addHumidity called', () => {
		addHumidity('60');

		const humidity = document.querySelector('.humidity');
		const humidityContent = humidity.textContent;

		expect(humidityContent).not.toBeNull();
	});

	it('humidity element should not be empty string when addHumidity called', () => {
		addHumidity('60');

		const humidity = document.querySelector('.humidity');
		const humidityContent = humidity.textContent;

		expect(humidityContent).not.toBe('');
	});
});

// icon
describe('addIcon()', () => {
	it('icon element should not be null when addIcon called', () => {
		addIcon('test');

		const icon = document.querySelector('.weather-icon');
		const iconSrc = icon.src;

		expect(iconSrc).not.toBeNull();
	});

	it('icon element should not be empty string when addIcon called', () => {
		addIcon('test');

		const icon = document.querySelector('.weather-icon');
		const iconSrc = icon.src;

		expect(iconSrc).not.toBe('');
	});
});

// location
describe('addLocation()', () => {
	it('location element should not be null when addLocation called', () => {
		addLocation('testCity', 'testCountry');

		const location = document.querySelector('#location');
		const locationContent = location.textContent;

		expect(locationContent).not.toBeNull();
	});

	it('location element should not be empty string when addLocation called', () => {
		addLocation('testCity', 'testCountry');

		const location = document.querySelector('#location');
		const locationContent = location.textContent;

		expect(locationContent).not.toBe('');
	});
});

// tempMin tempMax
describe('addTempMinMax()', () => {
	it('temp-min and temp-max element should not be null when addTempMinMax called', () => {
		addTempMinMax(299, 299);

		const tempMin = document.querySelector('.temp-min');
		const tempMax = document.querySelector('.temp-max');
		const tempMinContent = tempMin.textContent;
		const tempMaxContent = tempMax.textContent;

		expect(tempMinContent).not.toBeNull();
		expect(tempMaxContent).not.toBeNull();
	});

	it('temp-min and temp-max element should not be empty string when addTempMinMax called', () => {
		addTempMinMax(299, 299);

		const tempMin = document.querySelector('.temp-min');
		const tempMax = document.querySelector('.temp-max');
		const tempMinContent = tempMin.textContent;
		const tempMaxContent = tempMax.textContent;

		expect(tempMinContent).not.toBe('');
		expect(tempMaxContent).not.toBe('');
	});
});

// wind and deg
describe('addWind()', () => {
	it('wind-speed and wind-deg element should not be null when addWind called', () => {
		addWind(1, 1);

		const windSpeed = document.querySelector('.wind-speed');
		const windDeg = document.querySelector('.wind-deg');
		const windSpeedContent = windSpeed.textContent;
		const windDegContent = windDeg.textContent;

		expect(windSpeedContent).not.toBeNull();
		expect(windDegContent).not.toBeNull();
	});

	it('wind-speed and wind-deg element should not be empty string when addWind called', () => {
		addWind(1, 1);

		const windSpeed = document.querySelector('.wind-speed');
		const windDeg = document.querySelector('.wind-deg');
		const windSpeedContent = windSpeed.textContent;
		const windDegContent = windDeg.textContent;

		expect(windSpeedContent).not.toBe('');
		expect(windDegContent).not.toBe('');
	});
});
