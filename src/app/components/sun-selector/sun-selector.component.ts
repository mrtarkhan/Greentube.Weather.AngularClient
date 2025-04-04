import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { SunTimeType } from 'src/app/models/SuntimeType';

@Component({
  selector: 'app-sun-selector',
  templateUrl: './sun-selector.component.html',
  styleUrls: ['./sun-selector.component.css']
})
export class SunSelectorComponent {
  @Output() sunChanged = new EventEmitter<SunTimeType>();
  currentSunTime: SunTimeType = SunTimeType.Sunrise;
  sunTimes = {
    [SunTimeType.Sunrise]: 'Sunrise',
    [SunTimeType.Sunset]: 'Sunset'
  };
  sunTimeKeys = [SunTimeType.Sunrise, SunTimeType.Sunset]
  localStorageKey: string = "suntime";

  constructor() { }

  ngOnInit() {
    const storedSun = localStorage.getItem(this.localStorageKey);
    if (storedSun && storedSun != this.currentSunTime) {
      this.currentSunTime = storedSun as SunTimeType ?? SunTimeType.Sunrise;
      this.sunChanged.emit(this.currentSunTime);
    }
  }

  setSunTime(sun: SunTimeType) {
    this.currentSunTime = sun;
    localStorage.setItem(this.localStorageKey, sun);
    this.sunChanged.emit(this.currentSunTime);
  }
}