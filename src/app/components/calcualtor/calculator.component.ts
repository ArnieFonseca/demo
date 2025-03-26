import { Component, ElementRef, viewChild, OnInit, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { CalculatorService } from '../../services/calculator.service'
import { Observable } from 'rxjs';
import { CalculatorResponse } from '../../interfaces/calculator_response';
import { OperatorResponse } from '../../interfaces/operator-response';


type SignalHtmlInput = Signal<ElementRef<HTMLInputElement> | undefined> 
@Component({
  selector: 'app-calculator',
  imports: [FormsModule, NgFor],
  templateUrl: './calculator.component.html'

})
export class CalculatorComponent implements OnInit {

  /**
   * References to HTML Tags
   */
  operationsRef = viewChild<ElementRef<HTMLSelectElement>>("operations")
  firstNumberRef: SignalHtmlInput   = viewChild<ElementRef<HTMLInputElement>>("firstNum")  
  secondNumberRef: SignalHtmlInput  = viewChild<ElementRef<HTMLInputElement>>("secondNum")  

  /**
   * Components Properties
   */
  firstNumber:string = ""
  secondNumber:string = ""
  result:string = ""  
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

        console.log("Result  from Service ", res)
        this.operators = res.result

      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }

  /**
   * Check that the input is numeric
   * @param num input to validate
   * @returns true is success; false is failure
   */
  isNumeric(num:string):boolean {

    // Check 0 to 9 range
    const isDigit = (n:string):boolean => n >= '0' && n <= '9'

    if (num.trim().length === 0) {  // Case of empty ==> False
      return false
    }
    else {                          // Otherwise check each character
      const anw:boolean  = [...num].every(isDigit)
      return anw
    }
  }

  /**
   * Check that the input is valid before call the API Service
   * @param num input to validate
   * @param refElem Html tag reference 
   * @returns true is success; false is failure
   */
  inputValidation(num:string,  refElem: SignalHtmlInput):boolean {
    const anw:boolean = this.isNumeric(num)
    if (anw === false) {
       
      (refElem()?.nativeElement as HTMLInputElement).focus() 
      this.result = "Input is not numeric"
    }

    return anw
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
   * Button Click Event Handler
   */
  doCalculate(): void {

    /**
     * Validate inputs
     */
    if ( !this.inputValidation(this.firstNumber, this.firstNumberRef)  ) {      
      return
    }

    if ( !this.inputValidation(this.secondNumber,  this.secondNumberRef) ){ 
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

}
