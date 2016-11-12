import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTimer'
})
export class FormatTimerPipe implements PipeTransform {

  transform(value:any, args?:any):any {
    let m:string = (Math.floor(value / 60)).toString();
    let s:string = (Number(value) % 60).toString();

    if (m.length<2) {
      m = "0" + m;
    }
    if (s.length<2) {
      s = "0" + s;
    }

    return m + ":" + s;
  }

}
