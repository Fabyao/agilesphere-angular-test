import { Action } from '@ngrx/store';
import { Weather } from '../../../model/weather';

export enum ActionTypes {
    WeatherSearch = '[Weather Page] search',
    WeatherApiLoaded = '[Weather API] Weather loaded',
    WeatherApiFailed = '[Weather API] Weather failed'
}

export class WeatherSearchInfo implements Action {
    readonly type = ActionTypes.WeatherSearch;

    constructor(readonly payload: { city: string }) { }
}

export const weatherSearchActionCreator = (city: string): WeatherSearchInfo => {
    return new WeatherSearchInfo({ city: city });
};

export class WeatherApiLoaded implements Action {
    readonly type = ActionTypes.WeatherApiLoaded;

    constructor(readonly payload: { weather: Weather }) { }
}

export class WeatherApiFailed implements Action {
    readonly type = ActionTypes.WeatherApiFailed;

    constructor() { }
}

export const weatherApiSearchActionCreator = (weather: Weather): WeatherApiLoaded => {
    return new WeatherApiLoaded({ weather: weather });
};

export type WeatherActions = WeatherSearchInfo | WeatherApiLoaded | WeatherApiFailed;
