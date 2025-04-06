import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { citySelected } from 'src/app/states/actions/city-selector.actions';

@Component({
  selector: 'app-city-selector',
  templateUrl: './city-selector.component.html',
  styleUrls: ['./city-selector.component.css']
})
export class CitySelectorComponent {
  current$: Observable<string> = of<string>('Vienna');
  cities: string[] = ["London", "Vienna", "Ljubljana", "Belgrade", "Valletta"];

  constructor(private store: Store<{ city: 'Vienna' }>) {
    this.current$ = this.store.select('city');
  }

  ngOnInit() {
    let storedCity = localStorage.getItem('city');
    if (storedCity == undefined) {
      storedCity = 'Vienna';
    }

    this.store.dispatch(citySelected({ name: storedCity }));
  }

  setCity(city: string) {
    this.store.dispatch(citySelected({ name: city }));
  }


}
