import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CalculatorService } from './services/calculator.service'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html'
  
})
export class AppComponent {
  title = 'Calculator';

  firstNumber = "11"
  secondNUmber  =  "7"
  result = ""



  constructor(private service:CalculatorService){}
  
  addNumber():void {

    const fst  =  parseFloat(this.firstNumber)
    const snd  =  parseFloat(this.secondNUmber)

    const data  = this.service.getData(fst,snd)
    data.subscribe({
      next: (res: any) => {                      // When Data arrived
        console.log("Result  from Service ", res)
        this.result = res.result                                 // Display the data 
      },
      error: (err: any) => {                                 // When failure
        console.log(err)
    
          }            // Display Server error   
    })  




  }
}
