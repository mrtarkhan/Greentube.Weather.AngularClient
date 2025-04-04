import { Component, EventEmitter, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-city-selector',
  templateUrl: './city-selector.component.html',
  styleUrls: ['./city-selector.component.css']
})
export class CitySelectorComponent {
  @Output() cityChanged = new EventEmitter<string>();
  currentCity: string = 'Vienna';
  cities: string[] = ["London", "Vienna", "Ljubljana", "Belgrade", "Valletta"];

  constructor() { }

  ngOnInit() {
    const storedCity = localStorage.getItem('city');
    if (storedCity && storedCity != this.currentCity) {
      this.currentCity = storedCity;
    }
    this.cityChanged.emit(this.currentCity);
  }

  setCity(city: string) {
    this.currentCity = city;
    localStorage.setItem('city', city);
    this.cityChanged.emit(this.currentCity);
  }


}
