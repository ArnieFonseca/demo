// import { Injectable } from '@angular/core';
// import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  constructor(private http: HttpClient) { }

  getData(fst:number, snd:number): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/calc/add/${fst}/${snd}`)
  }
}
