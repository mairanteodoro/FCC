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
  display:string = "0";
  mathOp:string;
  subTotal:number = 0;
  total:any[] = [];

  onClicked(event) {

    // get the value of pressed button
    const pressedKey = event.target.textContent.trim();
    // call main method
    this.display = this.main(pressedKey, this.display);

  }

  main(pressedKey:any, displayed:string) {

    if (Number(pressedKey) || Number(pressedKey)===0) {
      // pressed key is a number
      // the first part of the r.h.s. in the equation below
      // tests for zeros at the begining;
      // if any found, remove it and concatenate to previous string
      displayed = ((displayed.indexOf("0")===0 && displayed.indexOf(".")===-1) ? displayed.slice(1) : displayed) + pressedKey;
    } else {
      // pressed key is not a number
      if (pressedKey==='+' || pressedKey==='-' || pressedKey==='x' || pressedKey==='÷') {
        // pressed key is a mathematical operation;
        // therefore, save the string being displayed
        // and the chosen operation
        this.total.push(Number(displayed), pressedKey);
        this.saveDisplayed(this.total[0], pressedKey);
        this.subTotal = Number(this.total[0]);
<<<<<<< HEAD
=======
        console.log(this.total, displayed, this.subTotal);
>>>>>>> d2714de23d1d165d8bbd5eefc3c52dbdbcbe339c
        // and reset the displayed value
        displayed = "0";
      } else {
        // pressed key is a miscellany (AC, +/-, %, or =)
        if (pressedKey==="AC") {
          // reset all variables
          displayed = "0";
          this.clearAll();
        }
        if (pressedKey==="+/-") {
          // change sign
          displayed = displayed.indexOf("-")===0 ? displayed.replace("-", "") : "-" + displayed;
        }
        if (pressedKey===".") {
          // add decimal point
          displayed = displayed.indexOf(".")===-1 ? displayed + "." : displayed;
        }
        if (pressedKey==="%") {
          // percentage
          displayed = String(this.subTotal * Number(displayed) / 100.);
<<<<<<< HEAD
=======
          console.log(this.subTotal, displayed);
>>>>>>> d2714de23d1d165d8bbd5eefc3c52dbdbcbe339c
        }
        if (pressedKey==='=') {
          // push last displayed value and print the results
          this.total.push(Number(displayed));
          displayed = this.saveDisplayed(this.total[0], pressedKey);
          if (displayed.length>11) {
            // number too big to fit display area
            displayed = "Too big..."
<<<<<<< HEAD
=======
            console.log("RESULT = ", displayed, displayed.length);
>>>>>>> d2714de23d1d165d8bbd5eefc3c52dbdbcbe339c
          }
        }
      }
    }

    return displayed;

  }

  saveDisplayed(displayed:string, operation:string) {

    if (this.total.length>3 || operation==="=") {
      if (this.total[1]==="+") {
        this.subTotal = this.total[0] + this.total[2];
      }
      if (this.total[1]==="-") {
        this.subTotal = this.total[0] - this.total[2];
      }
      if (this.total[1]==="x") {
        this.subTotal = this.total[0] * this.total[2];
      }
      if (this.total[1]==="÷") {
        this.subTotal = this.total[0] / this.total[2];
      }
      // concatenate subtotal and the next operation
      this.total = [this.subTotal, operation];

      return String(this.subTotal);

    }

  }

  clearAll() {

    this.display = "0"
    this.total = [];
    this.subTotal = 0;
    this.mathOp = "";

  }

}
