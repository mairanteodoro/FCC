import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// MaterializeCSS
import { MaterializeModule } from 'angular2-materialize';
import "materialize-css";

import { AppComponent } from './app.component';
import { FormatTimerPipe } from './format-timer.pipe';

@NgModule({
  declarations: [
    AppComponent,
    FormatTimerPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterializeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
