import { Component, ElementRef, viewChild, OnInit, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { CalculatorService } from '../../services/calculator.service'
import { Observable } from 'rxjs';
import { CalculatorResponse } from '../../interfaces/calculator_response';
import { OperatorResponse } from '../../interfaces/operator-response';
import { NumericValidation, SignalHtmlInput } from '../../shared/numeric-validation'
import '../../shared/string-extention'
@Component({
  selector: 'app-calculator',
  imports: [FormsModule, NgFor],
  templateUrl: './calculator.component.html'

})
export class CalculatorComponent implements OnInit {

  /**
   * Constants
   */
  readonly INVALID_NUMERIC_VALUE:string = 'Invalid numeric value'

  /**
   * References to HTML Tags
   */
  operationsRef = viewChild<ElementRef<HTMLSelectElement>>('operations')
  firstNumberRef: SignalHtmlInput   = viewChild<ElementRef<HTMLInputElement>>('firstNum')  
  secondNumberRef: SignalHtmlInput  = viewChild<ElementRef<HTMLInputElement>>('secondNum'
)  

  /**
   * Components Properties
   */
  firstNumber:string  = String.empty
  secondNumber:string = String.empty
  result:string       = String.empty  
  operators: string[] = []

  // Constructor
  constructor(private service: CalculatorService) { }

  /**
   * Envent Handler for Initialization
   */
  ngOnInit() {
    // Call Python Fast API Service
    const operators:Observable<OperatorResponse> = this.service.getOperators()
    
    // Retrive Data Asynch
    operators.subscribe({
      next: (res: OperatorResponse) => {

        console.log("Result from Service ", res)
        this.operators = res.result

      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }
 
  /**
   * Get the value of the operation dropdown
   * @returns selected value
   */
  retriveDropdownSelection():string {

      // Get Access to the HTML Select
      const cbo:HTMLSelectElement = this.operationsRef()?.nativeElement as HTMLSelectElement

      // Get Access to the HTML Select Option Collection
      const opers:HTMLOptionsCollection = cbo.options
  
      // Get the value of the Selected Option
      const oper:string = opers.item(opers.selectedIndex)?.value as string

      return oper
  }

  /**
   * Clear the result when the operation dropdown changes
   */
  operChange(): void {
    this.result = String.empty
  }
  
  /**
   * Button Click Event Handler
   */
  doCalculate(): void {  

    /**
     * Validate inputs
     */
    if ( !NumericValidation.inputValidation(this.firstNumberRef)  ) {  
      this.result = this.INVALID_NUMERIC_VALUE    
      return
    }

    if ( !NumericValidation.inputValidation(this.secondNumberRef) ){ 
      this.result = this.INVALID_NUMERIC_VALUE
      return
    }    

    /**
     * Convert string to numeric values
     */
    const fst:number = parseFloat(this.firstNumber)
    const snd:number = parseFloat(this.secondNumber)

    // Get the Dropdown selection
    const oper:string = this.retriveDropdownSelection()

    // Call Python Fast API Service
    const data : Observable<CalculatorResponse>  = this.service.getData(oper, fst, snd)

    // Retrive Data Asynch
    data.subscribe({
      next: (res: CalculatorResponse) => {
        console.log("Result  from Service ", res)
        this.result = res.result.toString()
      },
      error: (err: any) => {
        console.log(err)
      }
    })

  }

  /**
   * Clear input and message fields
   */
  doReset(): void {

    this.firstNumber  = String.empty
    this.secondNumber = String.empty
    this.result       = String.empty 
  }
}
