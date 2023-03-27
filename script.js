const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const form = document.querySelector('.app__form');
const input = document.querySelector('.app__input');
const btn = document.querySelector('.app__go');
const localTime = document.querySelector('.app__localtime');
const temp = document.querySelector('.app__temperature');
const wind = document.querySelector('.app__wind');
const pressure = document.querySelector('.app__pressure');
const humidity = document.querySelector('.app__humidity');
const state = document.querySelector('.app__state');
const stateImg = document.querySelector('.app__central-icon');
const h1 = document.querySelector('.app__h1');
const edit = document.querySelector('.app__edit');
const switcher1 = document.querySelector('#switcher1');
const switcher2 = document.querySelector('#switcher2');
const airQuality = document.querySelector('.air');
const forecast = document.querySelector('.forecast');
const forecastWrapper = document.querySelector('.forecast__wrapper');
const airQualityWrapper = document.querySelector('.air__wrapper');

const getWeather = function() {
  const place = input.value;

  fetch(`https://api.weatherapi.com/v1/forecast.json?key=db66d43c6d024009b4b123828232203&q=${place}&days=4&aqi=yes&alerts=no`)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);

    const date = new Date(data.location.localtime);
    const dateString = `${date.getDate()} ${monthNames[date.getMonth()]}, ${date.getFullYear()}`;
    const forecastArr = data.forecast.forecastday;
    
    localTime.innerHTML = dateString;
    temp.innerHTML = data.current.temp_c + '℃';
    wind.innerHTML = data.current.wind_kph + ' km/h';
    pressure.innerHTML = data.current.pressure_mb + ' hpa';
    humidity.innerHTML = data.current.humidity + ' %';
    state.innerHTML = data.current.condition.text;
    stateImg.src = 'https:' + data.current.condition.icon;

    // recast

    forecastArr.forEach(function(day) {
      const f_day = document.createElement('div');
      f_day.classList.add('forecast__day');

      // nvert date to day of the week name

      let mydate = new Date(day.date);
      let myday = mydate.toLocaleString('en-us', {weekday: 'long'});

      const f_date = document.createElement('p');
      f_date.classList.add('forecast__date');
      f_date.innerHTML = myday;

      const f_temp = document.createElement('p');
      f_temp.classList.add('forecast__daytemp');
      f_temp.innerHTML = day.day.avgtemp_c + '℃';

      const img = document.createElement('img');
      img.src = 'https:' + day.day.condition.icon;

      f_day.appendChild(f_date);
      f_day.appendChild(f_temp);
      f_day.appendChild(img);

      forecastWrapper.appendChild(f_day);
    })

    // air quality

    const airQualityArrKeys = ['Carbon Monoxide','Ozone','Nitrogen dioxide','Sulphur dioxide','PM2.5','PM10','US-EPA Index','UK Defra Index'];
    const airQualityArrValues = Object.values(data.current.air_quality);

    for (let i = 0; i < airQualityArrKeys.length; i++) {
      const a_item = document.createElement('div');
      a_item.classList.add('air__item');

      const a_name = document.createElement('span');
      a_name.classList.add('air__item-name');
      a_name.innerHTML = airQualityArrKeys[i];

      const a_value = document.createElement('span');
      a_value.innerHTML = Math.round(airQualityArrValues[i] * 100) / 100;

      a_item.appendChild(a_name);
      a_item.appendChild(a_value);
      airQualityWrapper.appendChild(a_item);
    }

    h1.innerHTML = input.value;
  });
}

// start function on button click

form.addEventListener('submit', function(e) {
  e.preventDefault();
  forecastWrapper.innerHTML = null;
  getWeather();
  edit.classList.add('active');
  form.classList.remove('active');
});

// display Warsaw data on load

window.addEventListener("load", getWeather);

// forecast / air quality switches

switcher2.addEventListener("click", function() {
  forecast.classList.remove('active');
  airQuality.classList.add('active');
  switcher1.classList.remove('active');
  switcher2.classList.add('active');
})

switcher1.addEventListener("click", function() {
  forecast.classList.add('active');
  airQuality.classList.remove('active');
  switcher1.classList.add('active');
  switcher2.classList.remove('active');
})

// edit button

edit.addEventListener("click", function() {
  form.classList.add('active');
  edit.classList.remove('active');
})