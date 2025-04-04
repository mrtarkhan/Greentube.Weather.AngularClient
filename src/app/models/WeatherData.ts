import { City } from "./CityType";

export interface WeatherData {
    city: City;
    temprature: number;
    description: string;
    icon: string;
    sunriseTime: Date;
    sunsetTime: Date;
    unit: string;
    feelsLike: number;
    utcDatetime: Date;
    localDateTime: Date;
}