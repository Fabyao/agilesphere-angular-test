import { Action } from '@ngrx/store';
import { ActionTypes, WeatherActions } from '../actions/weather';
import { Weather } from '../../../model/weather';

export interface WeatherState {
    entities: { [key: string]: Weather };
}

export interface RootWeatherState {
    weather: WeatherState;
}
export const initialState: WeatherState = { entities: {} };

export function weatherReducer(state = initialState, action: WeatherActions) {
    switch (action.type) {
        case ActionTypes.WeatherApiLoaded:

            const newCityName = action.payload.weather.city.name;

            if (state.entities[newCityName]) {
                return state;
            }

            return {
                entities: {
                    ...state.entities,
                    [newCityName]: action.payload.weather
                }
            };

        default:
            return state;
    }
}
