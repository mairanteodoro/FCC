import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  // constant declarations
  buttons:number[] = [7,8,9,4,5,6,1,2,3,0];
  mathOps:string[] = [String.fromCharCode(247),"x","-","+","="];
  misc:string[] = ["AC","+/-","%"];
  decimalPoint:string = ".";

  // variable declarations
  displayed:string = "0";
  mathOp:string;
  subTotal:number = 0;
  total:any[] = [];

  onClicked(event) {

    console.log(event.target.textContent.trim());
    // get the value of pressed button
    const pressedKey = event.target.textContent.trim();
    // call main method
    this.main(pressedKey);

  }

  main(pressedKey) {

    if (Number(pressedKey) || Number(pressedKey)===0) {
      // pressed key is a number
      // the first part of the r.h.s. in the equation below
      // tests for zeros at the begining;
      // if any found, remove it and concatenate to previous string
      this.displayed = (this.displayed.indexOf("0")===0 ? this.displayed.slice(1) : this.displayed) + pressedKey;
    } else {
      // pressed key is not a number
      if (pressedKey==='+' || pressedKey==='-' || pressedKey==='x' || pressedKey==='÷') {
        // pressed key is a mathematical operation;
        // therefore, save the string being displayed
        // and the chosen operation
        this.total.push(Number(this.displayed), pressedKey);
        this.saveDisplayed(this.displayed, pressedKey);
        // and reset the displayed value
        this.displayed = "0";
      } else {
        // pressed key is a miscellany (AC, +/-, %, or =)
        if (pressedKey==="AC") {
          // reset all variables
          this.clearAll();
        }
        if (pressedKey==="+/-") {
          // change sign
          this.displayed = this.displayed.indexOf("-")===0 ? this.displayed.replace("-", "") : "-" + this.displayed;
        }
        if (pressedKey===".") {
          // add decimal point
          this.displayed = this.displayed.indexOf(".")===-1 ? this.displayed + "." : this.displayed;
        }
        if (pressedKey==="%") {
          // percentage
          console.log("pressedKey===%", this.subTotal, this.displayed);
          this.displayed = String(this.percent(this.subTotal, this.displayed));
        }
        if (pressedKey==='=') {
          // push last displayed value and print the results
          this.total.push(Number(this.displayed));
          this.saveDisplayed(this.displayed, pressedKey);
        } else {
          console.log("MISCELLANY");
        }
      }
    }

  }

  saveDisplayed(displayed, operation) {

    if (this.total.length>3 || operation==="=") {
      if (this.total[1]==="+") {
        this.subTotal = this.total[0] + this.total[2];
      };
      if (this.total[1]==="-") {
        this.subTotal = this.total[0] - this.total[2];
      }
      if (this.total[1]==="x") {
        this.subTotal = this.total[0] * this.total[2];
      }
      if (this.total[1]==="÷") {
        this.subTotal = this.total[0] / this.total[2];
      }
      this.total = [this.subTotal, operation];
      this.displayed = String(this.subTotal);
    }

  }

  percent(total, percentage) {

    console.log("percent:", total * (1.0 + percentage / 100.0));
    return total * (1.0 + percentage / 100.0);

  }

  clearAll() {

    this.displayed = "0"
    this.total = [];
    this.subTotal = 0;
    this.mathOp = "";

  }

}
