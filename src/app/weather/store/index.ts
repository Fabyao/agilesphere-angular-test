
import { ActionReducerMap } from '@ngrx/store';
import { Weather } from './effects/weather';
import * as fromWeather from './reducers/weather';

export const effects = [Weather];

export interface WeatherRootState {
    weather: fromWeather.WeatherState;
}

export const reducers: ActionReducerMap<WeatherRootState> = {
    weather: fromWeather.weatherReducer
};
