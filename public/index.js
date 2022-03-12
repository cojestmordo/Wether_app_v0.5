let request = async () => {
    const response = await fetch('/api');
    const data = await response.json();
    const currentWeatherData = data.current.condition.text
    const forecastWeatherData = data.forecast.forecastday[1].day.condition.text
    let currentWeatherBox = document.getElementById('currentWeather');
    let forecastWeatherBox = document.getElementById('forecastWeather');
    forecastWeatherBox.innerHTML = forecastWeatherData;
    currentWeatherBox.innerHTML = currentWeatherData;
}
request()
button = document.getElementById('button');
input = document.getElementById('mail')
function sendEmail (){
    console.log(input.value);
}
button.addEventListener('click',sendEmail);

