import { UnitType } from "./UnitType";
import { WeatherData } from "./WeatherData";

export interface WeatherResponse {
    weather: WeatherData;
    unit: UnitType;
}


