import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Project } from '../../Model/Project';
import { ProjectService } from '../../Service/project.service';
//declare var $:any;
@Component({
    selector: 'app-addproject',
    templateUrl: './addproject.component.html',
    styleUrls: ['./addproject.component.css'],
    providers: [DatePipe]
})
export class AddprojectComponent implements OnInit {

    // $:any;
    projectObj: Project = new Project();
    chkSetDateVal: boolean;
    dateIsValid: boolean = true;
    today: Date;
    tomorrow: Date;
    lstItem: string[];
    //lstItems:ListItem[];
    selectedManagerNm: string;
    Manager: string;
    lstprojects: Project[];
    constructor(private _datePipe: DatePipe, private _service: ProjectService) {
        this.chkSetDateVal = false;

        //this.projectObj.projectName="Project 1"; 
        this.selectedManagerNm = "";
        //  this.lstItems=[{ selected:false, Name:"Abhinav"},{ selected:false,Name:"Manish"}];
        this._service.getallProjects().subscribe(res => this.lstprojects = res);
    }

    ngOnInit() {
    }
    checkChange() {
        // console.log(control);
        this.dateIsValid = true;
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
        if (this._datePipe.transform(this.today, 'yyyy-MM-dd') <= this._datePipe.transform(this.tomorrow, 'yyyy-MM-dd')) {
            this.dateIsValid = true;
        }
        console.log(this.dateIsValid);
    }

    onSelection() {
        if (this.selectedManagerNm.length > 0) {
            this.Manager = this.selectedManagerNm;
        }
        console.log('on selection');
    }
    handleChange(evt) {
        this.selectedManagerNm = evt;
        console.log(evt);
    }

    onSearchClick() {
        this.lstItem = ["Abhinav", "Manish", "Vivek", "Deepak", "Akash", "Gaurav", "Shreyas", "Amit"];
    }
}

/* export class ListItem{
     selected:boolean=false;
     Name:string;
} */
