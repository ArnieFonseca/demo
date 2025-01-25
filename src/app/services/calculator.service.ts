
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CalculatorResponse}  from '../interfaces/calculator_response'


@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  constructor(private http: HttpClient) { }

  getData(oper:string, fst:number, snd:number): Observable<CalculatorResponse> {
    return this.http.get<CalculatorResponse>(`http://127.0.0.1:8000/calc/${oper}/${fst}/${snd}`)
  }
}
