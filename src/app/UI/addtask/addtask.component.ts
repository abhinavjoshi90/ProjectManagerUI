import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Project } from '../../Model/Project';
import { ProjectService } from '../../Service/project.service';
import { Task } from '../../Model/Task';
import { User } from '../../Model/User';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})
export class AddtaskComponent implements OnInit {
  taskObj: Task;
  lstItem: ModelView[] = [];
  searchTitle: string;
  selectedproject: Project;
  selectedparenttask: Task;
  selecteduser: User;
  projectName: string;
  parentTaskName: string;
  userName: string;
  searchId: number;
  taskName: string;
  isPrntTskChckd: boolean;
  dateIsValid: boolean = true;
  startDt: Date;
  endDt: Date;
  lstProjects: Project[];
  lstUsers: User[];
  lstParentTask: Task[];
  mv: ModelView;
  responseMsg: string;
  taskId: number;
  buttonText:string="";
  isUpdate:boolean;
  constructor(private _datePipe: DatePipe, private _service: ProjectService, private router: Router, private route: ActivatedRoute) {
    this.taskObj = new Task();
    this.responseMsg = "";
    this.isUpdate=false;
    this.route.params.subscribe(p => this.taskId = p["id"]);
    if (this.taskId === undefined) {
      this.isPrntTskChckd = false;
      this.dateIsValid = true;
      this.taskObj.StartDate = new Date();
      this.taskObj.EndDate = new Date();
      this.taskObj.EndDate.setDate(this.taskObj.StartDate.getDate() + 1);
      this.buttonText="Add Task";    
    }
    else {
      this.buttonText="Update Task";
      this.isUpdate=true;
      this._service.gettaskById(this.taskId).subscribe(res => {
        this.taskObj = res;
        if (this.taskObj.Project != null) {
          this.projectName = this.taskObj.Project.ProjectName;
        }

        if (this.taskObj.User != null) {
          this.userName = this.taskObj.User.FirstName + " " + this.taskObj.User.LastName;
          console.log(this.taskObj.ParentTaskName);
        }

        this.parentTaskName = this.taskObj.ParentTaskName;
      });
    }
  }


  ngOnInit() {
  }

  onPrjSearchClick() {
    this.lstItem = [];
    this.searchId = 1;
    this.searchTitle = "Search Projects";
    this._service.getallProjects().subscribe(res => {
      this.lstProjects = res;
      this.lstProjects.forEach(project => {
        this.mv = new ModelView();
        this.mv.Name = project.ProjectName;
        this.mv.Type = project;
        this.lstItem.push(this.mv);
        // console.log((project.ProjectName));
      });
    });
  }
  onPrntTskSearchClick() {
    this.lstItem = [];
    this.searchId = 2;
    this.searchTitle = "Search Parent Tasks";
    this._service.getallTasks().subscribe(res => {
      this.lstParentTask = res;
      this.lstParentTask.forEach(parntTask => {
        if (parntTask.TaskID == 0) {
          this.mv = new ModelView();
          this.mv.Name = parntTask.ParentTaskName;
          this.mv.Type = parntTask;
          this.lstItem.push(this.mv);
        }
      });
    });
    //this.lstItem = ["E-Remittance", "Transmission", "Integrated Receivables", "Global VR"];
  }
  onUserSearchClick() {
    this.lstItem = [];
    this.searchId = 3;
    this.searchTitle = "Search Users";
    this._service.getallUsers().subscribe(res => {
      this.lstUsers = res;
      this.lstUsers.forEach(user => {
        this.mv = new ModelView();
        this.mv.Name = user.FirstName + " " + user.LastName;
        this.mv.Type = user;
        this.lstItem.push(this.mv);
        // console.log((project.ProjectName));
      });

    });
    // this.lstItem = ["Abhinav", "Manish", "Vivek", "Deepak", "Akash", "Gaurav", "Shreyas", "Amit"];
  }

  handleChange(evt) {
    switch (this.searchId) {
      case 1: {
        this.selectedproject = evt;
        console.log(evt);
        break;
      }
      case 2: {
        this.selectedparenttask = evt;
        console.log(evt);
        break;
      }
      case 3: {
        this.selecteduser = evt;
        console.log(evt);
        break;
      }
    }
  }

  onSelection() {
    switch (this.searchId) {
      case 1: {
        if (this.selectedproject.ProjectID > 0) {
          this.projectName = this.selectedproject.ProjectName;
          this.taskObj.Project = this.selectedproject;
        }
        break;
      }
      case 2: {
        if (this.selectedparenttask.ParentTaskID > 0) {
          this.parentTaskName = this.selectedparenttask.ParentTaskName;
          this.taskObj.ParentTaskID = this.selectedparenttask.ParentTaskID;
          this.taskObj.ParentTaskName = this.selectedparenttask.ParentTaskName;
        }
        break;
      }
      case 3: {
        if (this.selecteduser.UserId > 0) {
          this.userName = this.selecteduser.FirstName + " " + this.selecteduser.LastName;
          this.taskObj.User = this.selecteduser;
        }
        break;
      }
    }
    console.log('on selection');
  }

  ValidateDate() {
    console.log('validate date');
    this.dateIsValid = false;
    if (this._datePipe.transform(this.taskObj.StartDate, 'yyyy-MM-dd') <= this._datePipe.transform(this.taskObj.EndDate, 'yyyy-MM-dd')) {
      this.dateIsValid = true;
    }
    console.log(this.dateIsValid);
  }
  addTask() {
    this._service.addTask(this.taskObj).subscribe(res => { this.responseMsg = res; });
  }
}

class ModelView {
  Name: string;
  Type: any;
}
