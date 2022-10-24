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

export const getWeatherIconId = id => {
	const weatherIconSet = {
		2: 'A0VVcAvPd3A',
		3: 'kiZiXe8xueo',
		5: 'F-t5EpfQNpk',
		6: 'r-XORSP-t2I',
		7: '7CME6Wlgrdk',
		8: 'zlGobrmAuyE',
	};

	return weatherIconSet[id];
};

export const addBackgroundImg = weatherId => {
	const weatherIconId = getWeatherIconId(parseInt(weatherId / 100));

	const body = document.querySelector('body');
	body.style.backgroundImage = `url("https://source.unsplash.com/${weatherIconId}/1920x1080")`;
	body.style.backgroundPosition = 'center';
	body.style.backgroundRepeat = 'no-repeat';
	body.style.backgroundSize = 'cover';
};

export const changeBg = (currentDate, sunset, sunrise) => {
	const main = document.querySelector('#main');

	if (currentDate > sunset || currentDate < sunrise) {
		main.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
		main.style.color = 'white';
	}
};

export const getWeather = async cityName => {
	const res = await fetch(
		`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=efe2f5d493e6d4639fa096da2405d21d`
	);

	const data = await res.json();

	const { temp, humidity, temp_min, temp_max } = data.main;
	const { icon, main, id } = data.weather[0];
	const { speed, deg } = data.wind;
	const { name, dt } = data;
	const { country, sunset, sunrise } = data.sys;

	console.log(data);
	addTemp(temp);
	addHumidity(humidity);
	addIcon(icon);
	addTempMinMax(temp_min, temp_max);
	addWind(speed, deg);
	addDescription(main);
	addLocation(name, country);
	addDate();

	// css style
	addBackgroundImg(id);
	changeBg(dt, sunset, sunrise);

	return data;
};
