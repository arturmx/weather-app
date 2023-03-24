const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const weekDays = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

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
const forecast = document.querySelector('.forecast');
const futureDate1 = document.querySelector('.forecast__date1');
const futureDate2 = document.querySelector('.forecast__date2');
const futureDate3 = document.querySelector('.forecast__date3');

const futureIcon1 = document.querySelector('.forecast__icon1');
const futureIcon2 = document.querySelector('.forecast__icon2');
const futureIcon3 = document.querySelector('.forecast__icon3');

const futureTemp1 = document.querySelector('.forecast__temp1');
const futureTemp2 = document.querySelector('.forecast__temp2');
const futureTemp3 = document.querySelector('.forecast__temp3');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const place = input.value;
  // input.value = h1.innerHTML;

  fetch(`http://api.weatherapi.com/v1/forecast.json?key=db66d43c6d024009b4b123828232203&q=${place}&days=3&aqi=yes&alerts=no`)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);

    const date = new Date(data.location.localtime);
    const dateString = `${date.getDay()} ${monthNames[date.getMonth()]}, ${date.getFullYear()}`;
    
    localTime.innerHTML = dateString;
    temp.innerHTML = data.current.temp_c + '℃';
    wind.innerHTML = data.current.wind_kph + ' km/h';
    pressure.innerHTML = data.current.pressure_mb + ' hpa';
    humidity.innerHTML = data.current.humidity + ' %';
    state.innerHTML = data.current.condition.text;
    stateImg.src = data.current.condition.icon;
    futureDate1.innerHTML = data.forecast.forecastday[0].date;
    futureDate2.innerHTML = data.forecast.forecastday[1].date;
    futureDate3.innerHTML = data.forecast.forecastday[2].date;
    futureTemp1.innerHTML = data.forecast.forecastday[0].day.avgtemp_c + '℃';
    futureTemp2.innerHTML = data.forecast.forecastday[1].day.avgtemp_c + '℃';
    futureTemp3.innerHTML = data.forecast.forecastday[2].day.avgtemp_c + '℃';
    futureIcon1.src= data.forecast.forecastday[0].day.condition.icon;
    futureIcon2.src= data.forecast.forecastday[1].day.condition.icon;
    futureIcon3.src= data.forecast.forecastday[2].day.condition.icon;
  });
})

// edit.addEventListener("click", function() {
//   form.classList.remove('app__inactive');
// })

switcher2.addEventListener("click", function() {
  forecast.classList.remove('forecast');
  forecast.classList.add('app__inactive');
  switcher1.classList.remove('active');
  switcher2.classList.add('active');
})

switcher1.addEventListener("click", function() {
  forecast.classList.add('forecast');
  forecast.classList.remove('app__inactive');
  switcher1.classList.add('active');
  switcher2.classList.remove('active');
})