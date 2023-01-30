// Chave de API
const apiKey = '8ef48f4573f4b326b4880cf4cfcecf8f';

// Interação
const  citySearchInput = document.getElementById('city-search-input');
const  citySearchButton = document.getElementById('city-search-button');

// Exibição
const  currentDate = document.getElementById('current-date');
const  cityName = document.getElementById('city-name');

const  weatherIcon = document.getElementById('weather-icon');
const  weatherDescription = document.getElementById('weather-description');
const  timeNow = document.getElementById('time-now');
const  currentTemperature = document.getElementById('current-temperature');

const  windSpeed = document.getElementById('wind-speed');
const  feelsLikeTemperature = document.getElementById('feels-like-temperature');
const  currentHumidity = document.getElementById('current-humidity');

const  sunriseTime = document.getElementById('sunrise-time');
const  sunsetTime = document.getElementById('sunset-time');


citySearchButton.addEventListener('click', () =>{

    let cityName = citySearchInput.value

    if(cityName == ''){
        alert('Escreva um nome de uma cidade !!');
    }else{
        getCityWeather(cityName);
    }
   

})

// https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=pt_br&appid=${apiKey}

navigator.geolocation.getCurrentPosition( 
    
    (position) => {

        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        getCurrentLocationWeather(lat, lon);
        
    },
    ( err) => {
        if(err.code == 1){
            alert('Geolocalização negada pelo usuario por favor permita para continuar...');
        }else{
            console.log(err);
        }
    }
)

function getCurrentLocationWeather(lat, lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${apiKey}`)
        .then( (response) => response.json() )
        .then( ( result) => displayWeather(result) )
}

function getCityWeather(cityName){

    weatherIcon.src = `./img/loading-icon.svg`;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=pt_br&appid=${apiKey}`)
    .then( (response) => response.json() )
    .then( ( result) => displayWeather(result) )

}

function displayWeather(result){
   
    let {
        dt, 
        name, 
        weather: [{ icon, description }],
        main: { temp, feels_like, humidity },
        wind: { speed },
        sys: { sunrise, sunset },

    } = result

    currentDate.textContent = formatDate(dt);
    cityName.textContent = name;

    weatherIcon.src = `./img/${icon}.svg`;
    weatherDescription.textContent = description;
    currentTemperature.textContent = `${Math.round(temp)}°C`;
    windSpeed.textContent = `${Math.round(speed * 3.6)} km/h`;
    feelsLikeTemperature.textContent = `${Math.round(feels_like)}°C`;
    currentHumidity.textContent = `${humidity}%`;
    sunriseTime.textContent = formatTime(sunrise);
    sunsetTime.textContent = formatTime(sunset);
}

function formatDate(epochTime){
    let date = new Date(epochTime * 1000);
    let formattedDate = date.toLocaleDateString('pt-BR', { month: "long", day: "numeric" });
    return `Hoje,  ${formattedDate}`
}

function formatTime(epochTime){
    let date = new Date(epochTime * 1000);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    return `${hours}:${minutes}`
}