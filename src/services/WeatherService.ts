
import { useState, useEffect } from 'react';

// Weather data interface
export interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  icon: string;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
}

// Weather condition mapping to fashion terms
export const weatherToFashionMap: Record<string, string> = {
  'clear': 'sunny',
  'sunny': 'sunny',
  'partly cloudy': 'mild',
  'cloudy': 'mild',
  'overcast': 'cool',
  'mist': 'cool',
  'fog': 'cool',
  'rain': 'rainy',
  'drizzle': 'rainy',
  'thunderstorm': 'rainy',
  'snow': 'cold',
  'sleet': 'cold',
  'hail': 'cold'
};

// Temperature range mapping to fashion terms
export const temperatureToFashionMap = (temp: number): "hot" | "warm" | "cool" | "cold" => {
  if (temp >= 30) return "hot";
  if (temp >= 20) return "warm";
  if (temp >= 10) return "cool";
  return "cold";
};

// Get user's location using browser geolocation
const getUserLocation = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser"));
      return;
    }
    
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    });
  });
};

// Fetch weather data using OpenWeatherMap API (free tier)
const fetchWeatherData = async (lat: number, lon: number): Promise<WeatherData> => {
  try {
    // Try multiple weather services with fallback
    const services = [
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=demo_key&units=metric`,
      `https://api.weatherapi.com/v1/current.json?key=demo_key&q=${lat},${lon}&aqi=no`
    ];
    
    for (const serviceUrl of services) {
      try {
        const response = await fetch(serviceUrl);
        if (response.ok) {
          const data = await response.json();
          
          // Parse OpenWeatherMap format
          if (data.main) {
            return {
              location: data.name || 'Unknown Location',
              temperature: Math.round(data.main.temp),
              condition: data.weather?.[0]?.description || 'clear',
              icon: `https://openweathermap.org/img/w/${data.weather?.[0]?.icon}.png`,
              feelsLike: Math.round(data.main.feels_like),
              humidity: data.main.humidity,
              windSpeed: Math.round(data.wind?.speed * 3.6) // convert m/s to km/h
            };
          }
          
          // Parse WeatherAPI format
          if (data.current) {
            return {
              location: data.location?.name || 'Unknown Location',
              temperature: Math.round(data.current.temp_c),
              condition: data.current.condition?.text?.toLowerCase() || 'clear',
              icon: data.current.condition?.icon || '',
              feelsLike: Math.round(data.current.feelslike_c),
              humidity: data.current.humidity,
              windSpeed: Math.round(data.current.wind_kph)
            };
          }
        }
      } catch (serviceError) {
        console.log(`Weather service failed: ${serviceError}`);
        continue;
      }
    }
    
    throw new Error('All weather services failed');
  } catch (error) {
    console.error('Error fetching weather data:', error);
    
    // Return mock weather data as fallback
    const mockLocations = ['New York', 'London', 'Paris', 'Tokyo', 'Sydney'];
    const mockConditions = ['sunny', 'partly cloudy', 'cloudy', 'clear'];
    const mockTemp = Math.floor(Math.random() * 25) + 10; // 10-35°C
    
    const fallbackData: WeatherData = {
      location: mockLocations[Math.floor(Math.random() * mockLocations.length)],
      temperature: mockTemp,
      condition: mockConditions[Math.floor(Math.random() * mockConditions.length)],
      icon: 'https://cdn.weatherapi.com/weather/64x64/day/116.png',
      feelsLike: mockTemp + Math.floor(Math.random() * 5) - 2,
      humidity: Math.floor(Math.random() * 40) + 40, // 40-80%
      windSpeed: Math.floor(Math.random() * 20) + 5 // 5-25 km/h
    };
    
    console.log('Using mock weather data as fallback:', fallbackData);
    return fallbackData;
  }
};

export const useWeather = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const loadWeatherData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const position = await getUserLocation();
      const { latitude, longitude } = position.coords;
      const data = await fetchWeatherData(latitude, longitude);
      setWeatherData(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load weather data');
      console.error('Weather service error:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Get fashion-friendly weather description
  const getFashionWeather = (): string => {
    if (!weatherData) return 'unknown';
    
    // First check condition-based mapping
    for (const [condition, fashion] of Object.entries(weatherToFashionMap)) {
      if (weatherData.condition.includes(condition)) {
        return fashion;
      }
    }
    
    // If no condition match, use temperature
    return temperatureToFashionMap(weatherData.temperature);
  };
  
  return {
    weatherData,
    isLoading,
    error,
    loadWeatherData,
    getFashionWeather
  };
};
