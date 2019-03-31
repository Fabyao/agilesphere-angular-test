import { Component, OnChanges, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Weather, Summary, WeatherViewInfo } from '../../../model/weather';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html'
})
export class ResultsComponent implements OnChanges {
  @Input()
  weatherList$: Observable<WeatherViewInfo>;

  constructor() { }

  ngOnChanges() {
    // IMPLEMENT ANYTHING YOU BEKIEVE YOU MIGHT NEED HERE
  }
}


