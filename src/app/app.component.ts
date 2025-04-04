import { Component, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { UnitType } from './models/UnitType';
import { SunTimeType } from './models/SuntimeType';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  cities = ['London', 'Vienna', 'Ljubljana', 'Belgrade', 'Valletta'];
  selectedCity: string = '';
  selectedUnit: UnitType = UnitType.Standard;
  selectedSunTime: SunTimeType = SunTimeType.Sunrise;

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.fetchWeather();
  }

  fetchWeather() {
    // this.cities.forEach(city => {
    //   this.weatherService.getWeather(city, this.unit).subscribe(data => {
    //     this.weatherData[city] = data;
    //   });
    // });
  }

  onUnitChange(newUnit: UnitType) {
    this.selectedUnit = newUnit;
    this.fetchWeather();
  }
  
  onSunChange(newSunTime: SunTimeType) {
    this.selectedSunTime = newSunTime;
  }
  
  onCityChange(newCity: string) {
    this.selectedCity = newCity;
  }

  getTemperatureSymbol() {
    throw new Error('Method not implemented.');
  }
  isLoading(arg0: any): any {
    throw new Error('Method not implemented.');
  }

}