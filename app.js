import { getWeather } from './js/main.js';
const city = document.querySelector('#city');
getWeather('Taipei');

city.addEventListener('change', function () {
	getWeather(this.value);
	setInterval(() => {
		getWeather(this.value);
	}, 60000);
});
