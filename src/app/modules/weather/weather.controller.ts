import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { WeatherService } from "./weather.service";

const getWeather = catchAsync(async (req: Request, res: Response) => {
    const { city, lat, lon } = req.query;

    //  City based
    if (city) {
        const weather = await WeatherService.getWeatherByCity(city as string);

        return sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Weather retrieved successfully (city)",
            data: weather,
        });
    }

    //  Location based
    if (lat && lon) {
        const weather = await WeatherService.getWeatherByLocation(
            Number(lat),
            Number(lon)
        );

        return sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Weather retrieved successfully (current location)",
            data: weather,
        });
    }

    //  Invalid request
    return sendResponse(res, {
        statusCode: 400,
        success: false,
        message: "Provide city OR latitude & longitude",
        data: null,
    });
});

export const WeatherController = { getWeather };
