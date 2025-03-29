
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CalculatorResponse}  from '../interfaces/calculator_response'
import { OperatorResponse } from  '../interfaces/operator-response'
import { CalculatorConstant } from '../constant/calculator-constant'

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {


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
    return this.http.get<CalculatorResponse>(`${CalculatorConstant.SERVICE_URL}${CalculatorConstant.CALC}${oper}/${fst}/${snd}`)
  }

  /**
   * Get all the operations
   * @returns Observable of OperatorResponse
   */
  getOperators(): Observable<OperatorResponse> {
    return this.http.get<OperatorResponse>(`${CalculatorConstant.SERVICE_URL}${CalculatorConstant.CALC}${CalculatorConstant.OPERATIONS}`)
  }
}
