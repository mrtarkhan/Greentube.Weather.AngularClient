import { createReducer, on } from '@ngrx/store';
import { citySelected } from '../actions/city-selector.actions';

export const initialState: string = 'Vienna';
export const cityReducer = createReducer(initialState,
    on(citySelected, (state, { name }) => {
        return name;
    })
)