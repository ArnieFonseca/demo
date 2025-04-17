import { ElementRef, Signal } from '@angular/core';

export type SignalHtmlInput = Signal<ElementRef<HTMLInputElement> | undefined> 

/**
 * Common Numeric Validation
 */
export class NumericValidation {
      /**
   * Check that the input is numeric
   * @param num input to validate
   * @returns true is success; false is failure
   */
  static isNumeric(num:string):boolean {

    const ZERO:string  = '0'
    const NINE:string = '9'
    const DOT  = '.'

    // Check 0 to 9 range
    type IsDigit = (n:string) => boolean
    const isDigit:IsDigit = (n:string):boolean => (n >= ZERO && n <= NINE) || (n == DOT)

    type NumberOfDecimalPoints = (n:string) => n is '.'
    const numberOfDecimalPoints:NumberOfDecimalPoints  = (n:string) => n == DOT

    if (num.trim().length === 0) {  // Case of empty ==> False
      return false
    }
    else {                          // Otherwise check each character
      const anw:boolean  = [...num].every(isDigit) && [...num].filter(numberOfDecimalPoints).length <= 1
      return anw
    }
  }

    /**
   * Check that the input is valid before call the API Service
   * @param num input to validate
   * @param refElem Html tag reference 
   * @returns true is success; false is failure
   */
    static  inputValidation(refElem: SignalHtmlInput):boolean {
        const num:string = (refElem()?.nativeElement as HTMLInputElement).value
        const anw:boolean = this.isNumeric(num)
        if (anw === false) {
           
          (refElem()?.nativeElement as HTMLInputElement).focus()
        
        }
    
        return anw
      }
}