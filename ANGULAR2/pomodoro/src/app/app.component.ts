import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  myBreak:number;
  mySession:number;
  myTimer:number;

  ngOnInit() {
    this.myBreak = 5;
    this.mySession = 25;
    this.myTimer = this.mySession;
  };

  // METHODS
  decreaseBreak() {
    console.log("Decrease Break");
    this.myBreak = this.myBreak === 0 ? 0 : this.myBreak - 1;
  };

  increaseBreak() {
    console.log("Increase Break");
    this.myBreak = this.myBreak === this.mySession ? this.mySession : this.myBreak + 1;
  };

  decreaseSession() {
    console.log("Decrease Session");
    this.mySession = this.mySession === 0 ? 0 : this.mySession - 1;
    this.myTimer = this.mySession;
  };

  increaseSession() {
    console.log("Increase Session");
    this.mySession = this.mySession === 60 ? 25 : this.mySession + 1;
    this.myTimer = this.mySession;
  };

  startSession() {
    console.log("Start Session");
  };

  pauseSession() {
    console.log("Pause Session");
  };

  resetSession() {
    console.log("Reset Session");
  }

}
