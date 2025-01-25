import { Component, ElementRef, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalculatorService } from '../../services/calculator.service'


// import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-adder',
  imports: [FormsModule],
  templateUrl: './adder.component.html'

})
export class AdderComponent {

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
 
    // Get Access to the HTML Select Option Collection
    const opers =  this.operationsRef()?.nativeElement.options as HTMLOptionsCollection

    // Get the Current Index Value
    const idx =  this.operationsRef()?.nativeElement.selectedIndex as number
    
    // Get the value of the Selected Option
    const oper = opers.item(idx)?.value as string

    const data  = this.service.getData(oper, fst,snd)
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
