
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CalculatorResponse}  from '../interfaces/calculator_response'
import { OperatorResponse } from  '../interfaces/operator-response'
import { GobalValue } from '../constant/gobal-value'


@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  CALC:string = 'calc/'
  OPERATIONS:string = 'operations'

  /**
   * 
   * @param http Http Client to fetch data from the Server 
   */
  constructor(private http: HttpClient) { }

  /**
   * 
   * @param oper Operation to execute 
   * @param fst First Number
   * @param snd Second Number
   * @returns Observable of CalculatorResponse
   */
  getData(oper:string, fst:number, snd:number): Observable<CalculatorResponse> {
    return this.http.get<CalculatorResponse>(`${GobalValue.serviceURL}${this.CALC}${oper}/${fst}/${snd}`)
  }

  /**
   * Get all the operations
   * @returns Observable of OperatorResponse
   */
  getOperators(): Observable<OperatorResponse> {
    return this.http.get<OperatorResponse>(`${GobalValue.serviceURL}${this.CALC}${this.OPERATIONS}`)
  }
}
