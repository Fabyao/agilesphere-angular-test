import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SearchComponent } from './search.component';
import { ReactiveFormsModule } from '@angular/forms';

import Spy = jasmine.Spy;

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      imports: [ReactiveFormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit an event when searching for city', () => {
    spyOn(component.searchEvent, 'emit');
    const cityName = 'London';
    component.searchForm.controls['city'].setValue(cityName);
    component.search();
    expect(component.searchEvent.emit).toHaveBeenCalledWith(cityName);
  });
});
