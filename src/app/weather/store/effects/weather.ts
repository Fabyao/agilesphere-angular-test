import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { WeatherService } from '../../weather.service';
import { WeatherSearchInfo, ActionTypes, weatherApiSearchActionCreator, WeatherApiFailed } from '../../store/actions/weather';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators';

@Injectable()
export class Weather {

    @Effect()
    loadWeather = this.actions$
        .pipe(
            ofType<WeatherSearchInfo>(ActionTypes.WeatherSearch),
            map(action => action.payload),
            mergeMap((weatherSearchInfo) => this.weatherService.searchWeatherForCity(weatherSearchInfo.city)
                .pipe(
                    map(weather => {
                        return weatherApiSearchActionCreator(weather);
                    }),
                    catchError(() => of(new WeatherApiFailed()))
                ))
        );


    constructor(
        private actions$: Actions,
        private weatherService: WeatherService
    ) { }
}
