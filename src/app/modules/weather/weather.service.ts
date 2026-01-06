/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { WeatherResponse } from './weather.type';
import config from '../../config';
import ApiError from '../../errors/apiError';

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// City based
const getWeatherByCity = async (
    city: string
): Promise<WeatherResponse> => {
    try {
        const { data } = await axios.get(BASE_URL, {
            params: {
                q: city,
                appid: config.weatherApiKey,
                units: 'metric',
            },
        });

        return mapWeatherResponse(data);

    } catch (error: any) {
        if (error.response?.status === 404) {
            throw new ApiError(404, 'City not found');
        }
        throw new ApiError(500, 'Weather service unavailable');
    }
};

//  Location based (NEW)
const getWeatherByLocation = async (
    lat: number,
    lon: number
): Promise<WeatherResponse> => {
    try {
        const { data } = await axios.get(BASE_URL, {
            params: {
                lat,
                lon,
                appid: config.weatherApiKey,
                units: 'metric',
            },
        });

        return mapWeatherResponse(data);

    } catch {
        throw new ApiError(500, 'Weather service unavailable');
    }
};

// Common mapper
const mapWeatherResponse = (data: any): WeatherResponse => ({
    city: data.name,
    temperature: data.main.temp,
    description: data.weather[0].description,
    humidity: data.main.humidity,
});

export const WeatherService = {
    getWeatherByCity,
    getWeatherByLocation,
};
