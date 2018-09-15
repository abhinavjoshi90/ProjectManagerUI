import { Component, OnInit } from '@angular/core';
import { Project } from '../Model/Project';
import {DatePipe} from '@angular/common';
//declare var $:any;
@Component({
    selector: 'app-addproject',
    templateUrl: './addproject.component.html',
    styleUrls: ['./addproject.component.css'],
    providers:[DatePipe]
})
export class AddprojectComponent implements OnInit {

    // $:any;
    projectObj: Project = new Project();
    chkSetDateVal: boolean;
    dateIsValid: boolean=true;
    today: Date;
    tomorrow: Date;
    constructor( private _datePipe:DatePipe) {
        this.chkSetDateVal = false;

        //this.projectObj.projectName="Project 1";
    }

    ngOnInit() {
    }
    checkChange() {
        // console.log(control);
        this.dateIsValid=true;
        this.today = null;
        this.tomorrow = null;
        if (this.chkSetDateVal) {
            this.today = new Date();
            this.tomorrow = new Date();
            this.today.setDate(this.today.getDate());
            this.tomorrow.setDate(this.today.getDate() + 1);
          //  this.today=this._datePipe.transform(this.today,'yyyy-MM-dd').toString();
    // console.log(this._datePipe.transform(this.today,'yyyy-MM-dd')+ ' ' +this.tomorrow);
          //  console.log(this._datePipe.transform(this.today,'yyyy-MM-dd') <= this._datePipe.transform(this.tomorrow,'yyyy-MM-dd'));
        }
    }
    ValidateDate() {
        console.log('validate date');
        this.dateIsValid = false;
      //  console.log(this.today.toString()+ ' ' +this.tomorrow);
        if (this._datePipe.transform(this.today,'yyyy-MM-dd') <= this._datePipe.transform(this.tomorrow,'yyyy-MM-dd')) {
            this.dateIsValid = true;
        }
        console.log(this.dateIsValid);
    }
    
    // openModal(){
    //   $('#exampleModal').modal('show');
    //   }
}
