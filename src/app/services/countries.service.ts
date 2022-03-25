import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  countriesURL = 'http://localhost:8080/countries?';
  constructor(private httpClient: HttpClient) { }

  public countries(page: number, size: number, order: string, asc: boolean): Observable<any> {
    return this.httpClient.get<any>(this.countriesURL +  `page=${page}&$size=${size}&order=${order}&asc=${asc}`);
  }
}
