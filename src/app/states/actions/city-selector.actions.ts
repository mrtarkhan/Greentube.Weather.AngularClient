import { createAction, props } from '@ngrx/store';


export const citySelected = createAction("[city] new city selected", props<{ name: string }>());