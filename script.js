const input = document.querySelector('.app__input');
const btn = document.querySelector('.app__go');
const localTime = document.querySelector('.app__localtime');
const temp = document.querySelector('.app__temperature');
const wind = document.querySelector('.app__wind');
const pressure = document.querySelector('.app__pressure');
const humidity = document.querySelector('.app__humidity');
const state = document.querySelector('.app__state');
const stateImg = document.querySelector('.app__central-icon');
const bg = document.querySelector('.app__bg');

btn.addEventListener("click", function() {
  const place = input.value;

  fetch(`http://api.weatherapi.com/v1/current.json?key=db66d43c6d024009b4b123828232203&q=${place}&aqi=yes`)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    
    localTime.innerHTML = data.location.localtime;
    temp.innerHTML = data.current.temp_c + '℃';
    wind.innerHTML = data.current.wind_kph + ' km/h';
    pressure.innerHTML = data.current.pressure_mb + ' hpa';
    humidity.innerHTML = data.current.humidity + ' %';
    state.innerHTML = data.current.condition.text;
    stateImg.src = data.current.condition.icon;
    
    if (data.current.is_day = 1) {
      return bg.src = './assets/day-unsplash.jpg'
    }
    else {
      return bg.src = './assets/night-unsplash.jpg'
    }
    console.log(data.current.is_day)
  });
});
