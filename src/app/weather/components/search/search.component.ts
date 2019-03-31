import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {

  @Output()
  searchEvent = new EventEmitter<string>();

  searchForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      city: ['', Validators.required]
    });
  }

  search(): void {
    if (this.searchForm.invalid) {
      return;
    }

    this.searchEvent.emit(this.searchForm.get('city').value);
  }
}
