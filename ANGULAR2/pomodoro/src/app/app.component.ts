import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  break:number;
  session:number;

  ngOnInit() {
    this.break = 5
    this.session = 25
  }

  decreaseBreak() {
    console.log("Decrease Break");
    this.break = this.break === 0 ? 0 : this.break - 1;
  }

  increaseBreak() {
    console.log("Increase Break");
    this.break = this.break === this.session ? this.session : this.break + 1;
  }

  decreaseSession() {
    console.log("Decrease Session");
    this.session = this.session === 0 ? 0 : this.session - 1;
  }

  increaseSession() {
    console.log("Increase Session");
    this.session = this.session === 60 ? 60 : this.session + 1;
  }

}
