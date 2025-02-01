import { Component, ElementRef, viewChild, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { CalculatorService } from '../../services/calculator.service'


// import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-calculator',
  imports: [FormsModule, NgFor],
  templateUrl: './calculator.component.html'

})
export class CalculatorComponent implements OnInit {

  operationsRef = viewChild<ElementRef<HTMLSelectElement>>("operations")

  firstNumber = ""
  secondNumber = ""
  result = ""
  operators: string[] = []

  constructor(private service: CalculatorService) { }

  ngOnInit() {
    // Call Python Fast API Service
    const operators = this.service.getOperators()
    
    // Retrive Data Asynch
    operators.subscribe({
      next: (res: any) => {

        console.log("Result  from Service ", res)
        this.operators = res.result

      },
      error: (err: any) => {
        console.log(err)

      }
    })
  }

  doCalculate(): void {

    /**
     * Covert string to numeric values
     */
    const fst = parseFloat(this.firstNumber)
    const snd = parseFloat(this.secondNumber)

    // Get Access to the HTML Select
    const cbo = this.operationsRef()?.nativeElement as HTMLSelectElement

    // Get Access to the HTML Select Option Collection
    const opers = cbo.options

    // // Get the Current Index Value
    // const idx =  

    // Get the value of the Selected Option
    const oper = opers.item(opers.selectedIndex)?.value as string

    // Call Python Fast API Service
    const data = this.service.getData(oper, fst, snd)

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
