import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  myLabel:string[] = [];
  targetId:number;
  myArr:number[] = [];
  shapes:string[] = ['X', 'O'];
  toggle:boolean = true;
  scoreP1:number = 0;
  scoreP2:number = 0;

  onClick(event) {
    // get the id
    this.targetId = Number(event.target.id);
    console.log(this.myArr, this.targetId, this.toggle);
    console.log(
      this.myArr.indexOf(this.targetId),
      this.myLabel[this.myArr.indexOf(this.targetId)]
    )

    if (this.myArr.indexOf(this.targetId) === -1) {
      this.myLabel.push(this.toggle ? this.shapes[0] : this.shapes[1])
      this.myArr.push(this.targetId)
      this.toggle = !this.toggle;
    };

    console.log(this.myArr, this.toggle);
  };

  newGame() {
    this.myLabel = [];
    this.targetId = undefined;
    this.myArr = [];
    this.shapes = ['X', 'O'];
    this.toggle = true;
  };

  reset() {
    this.newGame();
    this.scoreP1 = 0;
    this.scoreP2 = 0;
  }

  scoreIncrement(event) {
    event.target.id == "P1" ? this.scoreP1++ : this.scoreP2++;
  }

}
