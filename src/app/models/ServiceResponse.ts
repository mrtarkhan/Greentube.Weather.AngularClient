import { WeatherData } from './WeatherData';

export interface ServiceResponse {
    data: WeatherData;
    message: string;
    status: number
}