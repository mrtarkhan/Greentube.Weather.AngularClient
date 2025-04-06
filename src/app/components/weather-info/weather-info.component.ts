import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { interval, Observable, of, Subject, takeUntil } from 'rxjs';
import { SunTimeType } from 'src/app/models/SuntimeType';
import { UnitType } from 'src/app/models/UnitType';
import { WeatherData } from 'src/app/models/WeatherData';
import { WeatherService } from 'src/app/services/weather.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-weather-info',
  templateUrl: './weather-info.component.html',
  styleUrls: ['./weather-info.component.css']
})
export class WeatherInfoComponent implements OnInit, OnDestroy, OnChanges {
  @Input() unit: UnitType = UnitType.Standard;
  @Input() suntime: SunTimeType = SunTimeType.Sunrise;

  city$: Observable<string> = of('Vienna');
  private selectedCity: string = '';

  currentWeather: WeatherData | undefined;
  isLoading: boolean = true;
  sunTimeEnum = SunTimeType;

  $timeSubject = new Subject();

  constructor(private weatherService: WeatherService, private store: Store<{ city: 'Vienna' }>) {
    this.city$ = store.select('city');
  }


  ngOnChanges(changes: SimpleChanges): void {

    console.log(changes['unit'])
    var isThereAnyChange: boolean = 
      (changes['unit'] && this.unit && changes['unit'].firstChange == false); // || 
    
    if (isThereAnyChange) {
      this.fetchWeather();
    }
  }

  ngOnInit() {
    this.isLoading = true;
    this.city$.subscribe(x => {
      this.selectedCity = x;
      this.fetchWeather();
    });
  }

  fetchWeather() {
    this.isLoading = true;
    this.weatherService.getWeather(this.selectedCity).subscribe(data => {
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
