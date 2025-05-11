
import { useState, useEffect } from 'react';

// Weather data interface
export interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  icon: string;
  feelsLike: number;
  humidity: number;
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
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=590c1a350d974792a5e173932232410&q=${lat},${lon}&aqi=no`
    );
    
    if (!response.ok) {
      throw new Error('Weather data fetch failed');
    }
    
    const data = await response.json();
    
    return {
      location: data.location.name,
      temperature: data.current.temp_c,
      condition: data.current.condition.text.toLowerCase(),
      icon: data.current.condition.icon,
      feelsLike: data.current.feelslike_c,
      humidity: data.current.humidity
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
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
