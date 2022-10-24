import { FahrenheitToCelsius } from './math.js';
import { formatDate } from './date.js';

export const addTemp = tempData => {
	const temp = document.querySelector('.temp');
	const transTemp = FahrenheitToCelsius(tempData);

	temp.textContent = `${transTemp} °C`;
};

export const addHumidity = humidityData => {
	const humidity = document.querySelector('.humidity');

	humidity.textContent = `${humidityData} %`;
};

export const addIcon = icon => {
	const img = document.querySelector('.weather-icon');
	img.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
};

export const addTempMinMax = (temp_min, temp_max) => {
	const tempMin = document.querySelector('.temp-min');
	const tempMax = document.querySelector('.temp-max');

	const tempMinData = FahrenheitToCelsius(temp_min);
	const tempMaxData = FahrenheitToCelsius(temp_max);
	tempMin.innerHTML = `&darr; ${tempMinData} °C`;
	tempMax.innerHTML = `&uarr; ${tempMaxData} °C`;
};

export const addWind = (speed, deg) => {
	const windSpeed = document.querySelector('.wind-speed');
	const windDeg = document.querySelector('.wind-deg');

	windSpeed.textContent = `${speed} m/s`;
	windDeg.textContent = `${deg} °C`;
};

export const addDescription = descriptionData => {
	const description = document.querySelector('.description');

	description.textContent = descriptionData;
};

export const addLocation = (city, country) => {
	const location = document.querySelector('#location');

	location.textContent = `${city}, ${country}`;
};

export const addDate = () => {
	const date = document.querySelector('#date');
	const today = formatDate(new Date());

	date.textContent = today;
};
