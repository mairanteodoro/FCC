import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  myLabel:string;
  targetId:Number;

  onClick(event) {
    console.log(event);
    console.log("Clicked " + event.target.id);
    this.targetId = Number(event.target.id);
    this.myLabel = event.target.id;
  }

}
