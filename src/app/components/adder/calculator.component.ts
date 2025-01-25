import { Component, ElementRef, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalculatorService } from '../../services/calculator.service'


// import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-calculator',
  imports: [FormsModule],
  templateUrl: './calculator.component.html'

})
export class CalculatorComponent {

  operationsRef = viewChild<ElementRef<HTMLSelectElement>>("operations")

  firstNumber = ""
  secondNumber  =  ""
  result = ""

  constructor(private service:CalculatorService){}
   
  
  addNumber():void {

    /**
     * Covert string to numeric values
     */
    const fst  =  parseFloat(this.firstNumber)
    const snd  =  parseFloat(this.secondNumber)
 
    // Get Access to the HTML Select
    const cbo =  this.operationsRef()?.nativeElement as HTMLSelectElement

    // Get Access to the HTML Select Option Collection
    const opers =  cbo.options  
    
    // // Get the Current Index Value
    // const idx =  
    
    // Get the value of the Selected Option
    const oper = opers.item(opers.selectedIndex)?.value as string

    // Call Python Fast API Service
    const data  = this.service.getData(oper, fst,snd)

    // Retrive Data Asynch
    data.subscribe({
      next: (res: any) => {                       
        console.log("Result  from Service ", res)
        this.result = res.result                                  
      },
      error: (err: any) => {                                  
        console.log(err)
    
      }               
    })
  }

}
