
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
 


@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  constructor(private http: HttpClient) { }

  getData(oper:string, fst:number, snd:number): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/calc/${oper}/${fst}/${snd}`)
  }
}
