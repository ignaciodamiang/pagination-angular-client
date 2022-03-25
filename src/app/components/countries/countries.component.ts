import { Component, OnInit } from '@angular/core';
import { CountriesService } from 'src/app/services/countries.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css'],
})
export class CountriesComponent implements OnInit {
  countries: Array<any> = [];
  totalPages: Array<number> = [];
  pageNumber = 0;
  size = 10;
  order = 'id';
  asc = true;

  isFirst = false;
  isLast = false;

  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.loadCountries();
  }

  loadCountries() {
    this.countriesService
      .countries(this.pageNumber, this.size, this.order, this.asc)
      .subscribe(
        (data) => {
          this.countries = data.content;
          this.isFirst = data.first;
          this.isLast = data.last;
          this.totalPages = new Array(data['totalPages']);
          console.log(data);
        },
        (err) => {
          console.log(err.error);
        }
      );
  }

  sort(): void {
    this.asc = !this.asc;
    this.loadCountries();
  }

  previous(): void {
    if (!this.isFirst) {
      this.pageNumber--;
      this.loadCountries();
    }
  }

  next(): void {
    if (!this.isLast) {
      this.pageNumber++;
      this.loadCountries();
    }
  }

  setPage(pageNumber: number): void {
    this.pageNumber = pageNumber;
    this.loadCountries();
  }

  setOrder(order: string) {
    this.order = order;
    this.loadCountries();
  }
}
