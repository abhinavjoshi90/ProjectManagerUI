import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Project } from '../../Model/Project';
import { ProjectService } from '../../Service/project.service';
import { User } from '../../Model/User';
//declare var $:any;
@Component({
    selector: 'app-addproject',
    templateUrl: './addproject.component.html',
    styleUrls: ['./addproject.component.css'],
    providers: [DatePipe]
})
export class AddprojectComponent implements OnInit {

    projectObj: Project = new Project();
    chkSetDateVal: boolean;
    dateIsValid: boolean = true;
    lstItem: User[];
    selectedManager: User;
    Manager: string;
    lstprojects: Project[];
    responseMsg: string;
    buttonText:string="";
    constructor(private _datePipe: DatePipe, private _service: ProjectService) {
        this.chkSetDateVal = false;
        this.selectedManager = new User();
        this.getAllProjects();
        this.buttonText="Add";
    }

    getAllProjects() {
        this._service.getallProjects().subscribe(res => this.lstprojects = res);
    }
    ngOnInit() {
    }
    checkChange() {
        this.dateIsValid = true;
        this.projectObj.StartDate = null;
        this.projectObj.EndDate = null;
        if (this.chkSetDateVal) {
            this.projectObj.StartDate = new Date();
            this.projectObj.EndDate = new Date();
            this.projectObj.StartDate.setDate(this.projectObj.StartDate.getDate());
            this.projectObj.EndDate.setDate(this.projectObj.StartDate.getDate() + 1);
        }
    }
    ValidateDate() {
        console.log('validate date');
        this.dateIsValid = false;
        if (this._datePipe.transform(this.projectObj.StartDate, 'yyyy-MM-dd') <= this._datePipe.transform(this.projectObj.EndDate, 'yyyy-MM-dd')) {
            this.dateIsValid = true;
        }
        console.log(this.dateIsValid);
    }

    onSelection() {
        if (this.selectedManager.EmployeeId > 0) {
            this.Manager = this.selectedManager.FirstName + " " + this.selectedManager.LastName;
            this.projectObj.Manager = this.selectedManager;
        }
        console.log('on selection');
    }
    handleChange(evt) {
        this.selectedManager = evt;
        console.log(evt);
    }

    onSearchClick() {
        this._service.getallUsers().subscribe(res => this.lstItem = res);
    }

    addProject() {
        this._service.addProject(this.projectObj).subscribe(res => { this.responseMsg = res; this.getAllProjects(); });
    }

    updateProject(obj) {
        this.projectObj = obj;
        if (obj.Manager != null) {
            this.Manager = obj.Manager.FirstName + " " + obj.Manager.LastName;
        }
        else{
            this.Manager="";
        }
        if (obj.StartDate != null && obj.EndDate != null) {
            this.chkSetDateVal = true;
        }
        else{
            this.chkSetDateVal=false;
        }
        this.buttonText="Update";
    }
}
