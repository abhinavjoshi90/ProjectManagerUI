import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})
export class AddtaskComponent implements OnInit {
  lstItem: string[];
  searchTitle: string;
  selectedprojectName: string;
  selectedparenttaskName: string;
  selecteduserName: string;
  projectName: string;
  parentTaskName: string;
  userName: string;
  searchId: number;
  taskName: string;
  isPrntTskChckd: boolean;
  dateIsValid: boolean = true;
  startDt:Date;
  endDt:Date;
 
  constructor(private _datePipe:DatePipe) {
    this.isPrntTskChckd = false;
    this.dateIsValid = true;
    this.startDt = new Date();
    this.endDt = new Date();
    this.endDt.setDate(this.startDt.getDate() + 1);
  }

  ngOnInit() {
  }

  onPrjSearchClick() {
    this.searchId = 1;
    this.searchTitle = "Search Projects";
    this.lstItem = ["Receivables Edge", "AON Carrier Link", "AON Bridge", "Remit One"];
  }
  onPrntTskSearchClick() {
    this.searchId = 2;
    this.searchTitle = "Search Parent Tasks";
    this.lstItem = ["E-Remittance", "Transmission", "Integrated Receivables", "Global VR"];
  }
  onUserSearchClick() {
    this.searchId = 3;
    this.searchTitle = "Search Users";
    this.lstItem = ["Abhinav", "Manish", "Vivek", "Deepak", "Akash", "Gaurav", "Shreyas", "Amit"];
  }

  handleChange(evt) {
    switch (this.searchId) {
      case 1: {
        this.selectedprojectName = evt;
        console.log(evt);
        break;
      }
      case 2: {
        this.selectedparenttaskName = evt;
        console.log(evt);
        break;
      }
      case 3: {
        this.selecteduserName = evt;
        console.log(evt);
        break;
      }
    }
  }

  onSelection() {
    switch (this.searchId) {
      case 1: {
        if (this.selectedprojectName.length > 0) {
          this.projectName = this.selectedprojectName;
        }
        break;
      }
      case 2: {
        if (this.selectedparenttaskName.length > 0) {
          this.parentTaskName = this.selectedparenttaskName;
        }
        break;
      }
      case 3: {
        if (this.selecteduserName.length > 0) {
          this.userName = this.selecteduserName;
        }
        break;
      }
    }
    console.log('on selection');
  }

  ValidateDate() {
    console.log('validate date');
    this.dateIsValid = false;
    if (this._datePipe.transform(this.startDt, 'yyyy-MM-dd') <= this._datePipe.transform(this.endDt, 'yyyy-MM-dd')) {
      this.dateIsValid = true;
    }
    console.log(this.dateIsValid);
  }
}
