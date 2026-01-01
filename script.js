// WeatherAPI.com Configuration
const API_KEY = 'de70546ee0794b8f8fb53412252606';
const API_BASE_URL = 'https://api.weatherapi.com/v1';

// DOM Elements
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const cityName = document.getElementById('cityName');
const currentDate = document.getElementById('currentDate');
const temperature = document.getElementById('temperature');
const weatherDescription = document.getElementById('weatherDescription');
const mainWeatherIcon = document.getElementById('mainWeatherIcon');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');
const forecastSection = document.getElementById('forecast');
const loader = document.getElementById('loader');
const errorMsg = document.getElementById('errorMsg');

// Initialize app
init();

function init() {
    getWeatherByCity('Durgapur');
    searchBtn.addEventListener('click', handleSearch);
    cityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });
    updateDate();
}

// Handle search
function handleSearch() {
    const city = cityInput.value.trim();
    if (city) {
        getWeatherByCity(city);
        cityInput.value = '';
    }
}

// Fetch weather data
async function getWeatherByCity(city) {
    showLoader();
    hideError();
    
    try {
        // Get current weather and forecast data (WeatherAPI provides both in one call)
        const response = await fetch(
            `${API_BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=5&aqi=no`
        );
        
        if (!response.ok) {
            throw new Error('City not found');
        }
        
        const data = await response.json();
        
        displayCurrentWeather(data);
        displayForecast(data);
        updateBackground(data.current.condition.text);
        
    } catch (error) {
        showError(error.message || 'Failed to fetch weather data');
    } finally {
        hideLoader();
    }
}

// Display current weather
function displayCurrentWeather(data) {
    cityName.textContent = data.location.name;
    temperature.textContent = `${Math.round(data.current.temp_c)}°C`;
    weatherDescription.textContent = data.current.condition.text;
    humidity.textContent = `${data.current.humidity}%`;
    windSpeed.textContent = `${data.current.wind_kph} km/h`;
    
    // WeatherAPI provides direct icon URLs
    mainWeatherIcon.src = `https:${data.current.condition.icon}`;
}

// Display forecast
function displayForecast(data) {
    forecastSection.innerHTML = '';
    
    // Get forecast days (skip today, show next 4 days)
    const forecastDays = data.forecast.forecastday.slice(1, 6);
    
    forecastDays.forEach(day => {
        const date = new Date(day.date);
        const dayDate = date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
        
        const forecastItem = document.createElement('div');
        forecastItem.className = 'forecast-item';
        forecastItem.innerHTML = `
            <div class="forecast-date">${dayDate}</div>
            <div class="forecast-icon">
                <img src="https:${day.day.condition.icon}" alt="${day.day.condition.text}">
            </div>
            <div class="forecast-temp">${Math.round(day.day.avgtemp_c)}°</div>
        `;
        
        forecastSection.appendChild(forecastItem);
    });
}

// Update date display
function updateDate() {
    const now = new Date();
    const options = { weekday: 'long', day: 'numeric', month: 'short' };
    currentDate.textContent = now.toLocaleDateString('en-US', options);
}

// Update background based on weather
function updateBackground(weatherCondition) {
    const body = document.body;
    const condition = weatherCondition.toLowerCase();
    
    let gradient;
    
    if (condition.includes('clear') || condition.includes('sunny')) {
        gradient = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    } else if (condition.includes('cloud') || condition.includes('overcast')) {
        gradient = 'linear-gradient(135deg, #606c88 0%, #3f4c6b 100%)';
    } else if (condition.includes('rain') || condition.includes('drizzle')) {
        gradient = 'linear-gradient(135deg, #00467f 0%, #a5cc82 100%)';
    } else if (condition.includes('thunder') || condition.includes('storm')) {
        gradient = 'linear-gradient(135deg, #283048 0%, #859398 100%)';
    } else if (condition.includes('snow') || condition.includes('blizzard')) {
        gradient = 'linear-gradient(135deg, #e6dada 0%, #274046 100%)';
    } else if (condition.includes('mist') || condition.includes('fog')) {
        gradient = 'linear-gradient(135deg, #ada996 0%, #f2f2f2 100%)';
    } else if (condition.includes('haze') || condition.includes('smoke')) {
        gradient = 'linear-gradient(135deg, #f3904f 0%, #3b4371 100%)';
    } else {
        gradient = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }
    
    body.style.background = gradient;
}

// Loader functions
function showLoader() {
    loader.classList.remove('hidden');
}

function hideLoader() {
    loader.classList.add('hidden');
}

// Error functions
function showError(message) {
    errorMsg.textContent = message;
    errorMsg.classList.remove('hidden');
    setTimeout(() => {
        hideError();
    }, 3000);
}

function hideError() {
    errorMsg.classList.add('hidden');
}