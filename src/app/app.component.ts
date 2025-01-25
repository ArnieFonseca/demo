import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdderComponent } from './components/adder/adder.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AdderComponent],
  templateUrl: './app.component.html'
  
})
export class AppComponent {

  title = 'Calculator';


}
