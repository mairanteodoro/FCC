import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  buttons:number[] = [7,8,9,4,5,6,1,2,3,0];
  mathOps:string[] = ['/','x','-','+','='];
  misc:string[] = ['AC','+/-','%'];
  decimalPoint:string = '.';

}
