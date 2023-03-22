const input = document.querySelector('input');
const btn = document.querySelector('button');
const citySpan = document.querySelector('#city');
const tempSpan = document.querySelector('#temp');
const windSpan = document.querySelector('#wind');

btn.addEventListener("click", function() {
  const place = input.value;

  fetch(`http://api.weatherapi.com/v1/current.json?key=db66d43c6d024009b4b123828232203&q=${place}&aqi=no`)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    
    citySpan.innerHTML = data.location.name;
    tempSpan.innerHTML = data.current.temp_c;
    windSpan.innerHTML = data.current.wind_kph;
  });
});