import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, retry } from 'rxjs';
import {risposta } from './table/table.component';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(private http:HttpClient) { }

  getDataRows(apiURL:string):Observable <risposta>
  {
    return this.http.get<risposta>(apiURL)
    .pipe
    (
      retry(2)
    )
  }
  
}


