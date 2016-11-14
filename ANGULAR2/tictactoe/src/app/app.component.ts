import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  onClick(event) {
    // console.log(event);
    console.log("Clicked " + event.target.id);
  }

}
