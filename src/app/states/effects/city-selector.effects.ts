import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { citySelected } from "../actions/city-selector.actions";
import { mergeMap, tap } from "rxjs";

@Injectable()
export class CityEffects {

    loadData$ = createEffect(() => this.actions$.pipe(
        ofType(citySelected),
        tap(citySelected => {
            localStorage.setItem('city', citySelected.name);
        })
    ), { dispatch: false })

    constructor(private actions$: Actions) {

    }

}