import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AddprojectComponent } from './UI/addproject/addproject.component';
import { AddtaskComponent } from './UI/addtask/addtask.component';
import { AdduserComponent } from './UI/adduser/adduser.component';
import { ViewtaskComponent } from './UI/viewtask/viewtask.component';
import { routing } from 'src/app/app.router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AddprojectComponent,
    AddtaskComponent,
    AdduserComponent,
    ViewtaskComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    ReactiveFormsModule
  ], 
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
