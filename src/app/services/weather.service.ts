import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceResponse } from '../models/ServiceResponse';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiUrl = 'https://localhost:7252';

  constructor(private http: HttpClient, private toastrService: ToastrService) { }

  getWeather(city: string): Observable<ServiceResponse> {
    return this.http.get<ServiceResponse>(`${this.apiUrl}/getWeatherData?city=${city}`, {
      withCredentials: true
    });
  }

  setTemperatureUnit(unit: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/setTemperatureUnit`, { temperatureUnit: unit }, {
      withCredentials: true
    });
  }
}
