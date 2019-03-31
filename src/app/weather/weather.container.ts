import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Weather, Summary, WeatherViewInfo } from '../model/weather';
import { weatherSearchActionCreator } from './store/actions/weather';
import { Observable } from 'rxjs/Observable';
import * as fromSelectors from './store/selectors/weather';
import { WeatherState } from './store/reducers/weather';

@Component({
  selector: 'app-weather',
  template: `
  <app-search (searchEvent)="citySearch($event)"></app-search>
  <app-results [weatherList$]="weatherList$"></app-results>  `
})
export class WeatherContainer implements OnInit {

  weatherList$: Observable<WeatherViewInfo>;

  constructor(private store: Store<WeatherState>) { }

  ngOnInit(): void {
    this.weatherList$ = this.store.pipe(select(fromSelectors.selectWeatherList));
  }

  citySearch(cityName: string) {
    const searchAction = weatherSearchActionCreator(cityName);

    this.store.dispatch(searchAction);
  }
}
