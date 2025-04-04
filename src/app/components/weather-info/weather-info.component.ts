import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { interval, Subject, takeUntil } from 'rxjs';
import { SunTimeType } from 'src/app/models/SuntimeType';
import { UnitType } from 'src/app/models/UnitType';
import { WeatherData } from 'src/app/models/WeatherData';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather-info',
  templateUrl: './weather-info.component.html',
  styleUrls: ['./weather-info.component.css']
})
export class WeatherInfoComponent implements OnInit, OnChanges, OnDestroy {
  @Input() city: string = 'Vienna';
  @Input() unit: UnitType = UnitType.Standard;
  @Input() suntime: SunTimeType = SunTimeType.Sunrise;
  
  currentWeather: WeatherData | undefined;
  isLoading: boolean = true;
  sunTimeEnum = SunTimeType;

  $timeSubject = new Subject();

  constructor(private weatherService: WeatherService) {}


  ngOnChanges(changes: SimpleChanges): void {

    console.log(changes['unit'])
    var isThereAnyChange: boolean = (changes['city'] && this.city && changes['city'].firstChange == false) ||
      (changes['unit'] && this.unit && changes['unit'].firstChange == false); // || 
      //(changes['suntime'] && this.suntime && changes['suntime'].firstChange == false);

      console.log(isThereAnyChange)

    if (isThereAnyChange) {
      this.fetchWeather();
    }
  }

  ngOnInit() {
    this.isLoading = true;
    this.fetchWeather();
  }

  fetchWeather() {
    this.isLoading = true;
    this.weatherService.getWeather(this.city).subscribe(data => {
      this.$timeSubject.next(0);
      this.currentWeather = data.data;
      interval(1000)
        .pipe(takeUntil(this.$timeSubject))
        .subscribe(() => {
          var dateObj = new Date((this.currentWeather as WeatherData).localDateTime);
          dateObj.setSeconds(dateObj.getSeconds() + 1);
          (this.currentWeather as WeatherData).localDateTime = dateObj;
        })
      this.isLoading = false;
    });
  }

  getTempratureSign() {
    if (this.unit == UnitType.Standard) {
      return "K";
    }

    if (this.unit == UnitType.Metric) {
      return "C"
    }

    return "F";

  }

  ngOnDestroy(): void {
    this.$timeSubject.next(0);
    this.$timeSubject.complete();
  }

}
