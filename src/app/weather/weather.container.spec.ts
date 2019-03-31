import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { WeatherContainer } from './weather.container';
import { WeatherState } from './store/reducers/weather';
import { StoreModule, Store, combineReducers, } from '@ngrx/store';
import { reducers } from './store';
import { weatherSearchActionCreator } from './store/actions/weather';

describe('WeatherContainer', () => {
  let component: WeatherContainer;
  let fixture: ComponentFixture<WeatherContainer>;
  let store: Store<WeatherState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WeatherContainer],
      imports: [
        StoreModule.forRoot({
          feature: combineReducers(reducers),
        })
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
    fixture = TestBed.createComponent(WeatherContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch an action to get weather by city', () => {
    const cityName = 'myCity';
    component.citySearch(cityName);

    const action = weatherSearchActionCreator(cityName);

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });
});
