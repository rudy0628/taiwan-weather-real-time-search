const temp = document.querySelector('.temp');
const img = document.querySelector('.weather-icon');
const tempMin = document.querySelector('.temp-min');
const tempMax = document.querySelector('.temp-max');
const windSpeed = document.querySelector('.wind-speed');
const windDeg = document.querySelector('.wind-deg');
const humidity = document.querySelector('.humidity');
const city = document.querySelector('#city');
const description = document.querySelector('.description');
const locations = document.querySelector('#location');
const date = document.querySelector('#date');
const body = document.querySelector('body');
const main = document.querySelector('#main');

const weatherIconSet = {
	2: 'A0VVcAvPd3A',
	3: 'kiZiXe8xueo',
	5: 'F-t5EpfQNpk',
	6: 'r-XORSP-t2I',
	7: '7CME6Wlgrdk',
	8: 'zlGobrmAuyE'
};

const addTemp = res => {
	const transTemp = Math.floor(res.data.main.temp - 273.15);
	temp.textContent = `${transTemp} °C`;
};

const addHumidity = res => {
	const humidityData = res.data.main.humidity;
	humidity.textContent = `${humidityData} %`;
};

const addIcon = res => {
	img.src = `https://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`;
};

const addTempMinMax = res => {
	const tempMinData = Math.floor(res.data.main.temp_min - 273.15);
	const tempMaxData = Math.floor(res.data.main.temp_max - 273.15);
	tempMin.innerHTML = `&darr; ${tempMinData} °C`;
	tempMax.innerHTML = `&uarr; ${tempMaxData} °C`;
};

const addWind = res => {
	const windSpeedData = res.data.wind.speed;
	const windDegData = res.data.wind.deg;
	windSpeed.textContent = `${windSpeedData} m/s`;
	windDeg.textContent = `${windDegData} °C`;
};

const addDescription = res => {
	const descriptionData = res.data.weather[0].main;
	description.textContent = descriptionData;
};

const addLocation = res => {
	const locationCity = res.data.name;
	const locationCountry = res.data.sys.country;
	locations.textContent = `${locationCity}, ${locationCountry}`;
};

const addDate = () => {
	const today = new Date().toLocaleString('en-us', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2');
	date.textContent = today;
};

const addBackgroundImg = res => {
	const weatherId = res.data.weather[0].id;
	const weatherIconSetId = parseInt(weatherId / 100);
	body.style.backgroundImage = `url("https://source.unsplash.com/${weatherIconSet[weatherIconSetId]}/1920x1080")`;
	body.style.backgroundPosition = 'center';
	body.style.backgroundRepeat = 'no-repeat';
	body.style.backgroundSize = 'cover';
};

const changeBg = res => {
	if (res.data.dt > res.data.sys.sunset || res.data.dt < res.data.sys.sunrise) {
		main.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
		main.style.color = 'white';
	}
};

const getWeather = async cityName => {
	const config = {
		params: {
			q: cityName,
			appid: 'efe2f5d493e6d4639fa096da2405d21d'
		}
	};
	const res = await axios.get('https://api.openweathermap.org/data/2.5/weather', config);
	console.log(res.data);
	addTemp(res);
	addIcon(res);
	addTempMinMax(res);
	addWind(res);
	addHumidity(res);
	addDescription(res);
	addLocation(res);
	addDate();
	addBackgroundImg(res);
	changeBg(res);
};

getWeather('Taipei');
setInterval(() => {
	getWeather('Taipei');
}, 60000);

city.addEventListener('change', function () {
	getWeather(this.value);
	setInterval(() => {
		getWeather(this.value);
	}, 60000);
});
