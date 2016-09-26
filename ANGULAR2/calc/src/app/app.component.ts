import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  // variable declarations
  buttons:number[] = [7,8,9,4,5,6,1,2,3,0];
  mathOps:string[] = [String.fromCharCode(247),'x','-','+','='];
  misc:string[] = ['AC','+/-','%'];
  decimalPoint:string = '.';
  displayed:string = '0';
  result:number = 0;
  num1:number = 0;
  op:string;
  counter:boolean = false;

  clearAll() {
    this.displayed = '0';
    this.result = 0;
    this.num1 = 0;
    this.counter = false;
  }

  onClicked(event) {
    if (this.counter) { this.clearAll(); }

    const temp = event.target.textContent.trim()
    if (Number(temp) || Number(temp)===0) {

      console.log("it's a number!");
      // prevents from starting with zero (unless is a number < 0 e.g. 0.1, 0.001)
      if (this.displayed.indexOf('0')===0 && (this.displayed.indexOf('.')!==1)) {this.displayed = this.displayed.slice(1)}
      this.displayed = this.displayed + temp;
      this.result = Number(this.displayed);

    } else {

      console.log("it's not a number!");

      if (temp==='AC') {
        console.log("clear the display!");
        this.displayed = '0';
        this.result = 0;
      }
      if (temp==='+/-') {
        console.log("change the sign!");
        this.displayed = (this.displayed.indexOf('-')===-1) ? '-' + this.displayed : this.displayed.replace('-', '');
        this.result = Number(this.displayed);
      }
      if (temp==='.') {
        console.log("add a decimal point!");
        // prevents from adding more than 1 decimal point
        this.displayed = (this.displayed.indexOf('.')===-1) ? this.displayed + '.' : this.displayed;
        this.result = Number(this.displayed);
      }

      // mathOps
      if (temp==='+') {
        console.log("mathOp: addition!")
        this.num1 = this.result;
        this.op = temp;
        this.displayed = '0';
        this.result = 0;
      }
      if (temp==='-') {
        console.log("mathOp: subtraction!")
        this.num1 = this.result;
        this.op = temp;
        this.displayed = '0';
        this.result = 0;
      }
      if (temp==='x') {
        console.log("mathOp: multiplication!")
        this.num1 = this.result;
        this.op = temp;
        this.displayed = '0';
        this.result = 0;
      }
      if (temp==='÷') {
        console.log("mathOp: division!")
        this.num1 = this.result;
        this.op = temp;
        this.displayed = '0';
        this.result = 0;
      }
      if (temp==='%') {
        console.log("mathOp: percentage!")
        if (this.op==='+') {
          this.displayed = String(this.num1 * (1 + this.result / 100));
        }
        if (this.op==='-') {
          this.displayed = String(this.num1 * (1 - this.result / 100));
        }
        if (this.op==='x') {
          this.displayed = String(this.num1 * (this.num1 * this.result / 100));
        }
        if (this.op==='÷') {
          this.displayed = String(this.num1 * (this.num1 / (this.result / 100)));
        }
      }

      // print result
      if (temp==='=') {
        console.log("print the result!")
        if (this.op==='+') {
          this.displayed = String(this.num1 + this.result);
        }
        if (this.op==='-') {
          this.displayed = String(this.num1 - this.result);
        }
        if (this.op==='x') {
          this.displayed = String(this.num1 * this.result);
        }
        if (this.op==='÷') {
          this.displayed = String(this.num1 / this.result);
        }
        // set counter to true so everything can be cleared
        this.counter = true;
      }

    }
  }

}
