import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { UnitType } from 'src/app/models/UnitType';


@Component({
  selector: 'app-unit-selector',
  templateUrl: './unit-selector.component.html',
  styleUrls: ['./unit-selector.component.css']
})
export class UnitSelectorComponent implements OnInit {
  @Output() unitChanged = new EventEmitter<UnitType>();
  currentUnit: UnitType = UnitType.Standard;
  unitLabels = {
    [UnitType.Standard]: 'Standard (Kelvin)',
    [UnitType.Metric]: 'Metric (°C)',
    [UnitType.Imperial]: 'Imperial (°F)'
  };

  unitKeys = [UnitType.Standard, UnitType.Metric, UnitType.Imperial];
  localStorageKey : string = "unit";

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    const storedUnit = localStorage.getItem(this.localStorageKey);
    if (storedUnit && storedUnit != this.currentUnit) {
      this.currentUnit = storedUnit as UnitType ?? UnitType.Standard;
      this.unitChanged.emit(this.currentUnit);
    }
  }

  setUnit(unit: UnitType) {
    this.currentUnit = unit;
    this.weatherService
      .setTemperatureUnit(unit)
      .subscribe({
        next: () => {
          localStorage.setItem(this.localStorageKey, unit);
          this.unitChanged.emit(this.currentUnit);
        },
        error: err =>{
          alert(err)
        }
      });
  }
}