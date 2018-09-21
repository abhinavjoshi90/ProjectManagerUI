import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../Service/project.service';
import { User } from '../../Model/User';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

  firstNm: string;
  lastNm: string;
  empId: number;
  usrObj: User = new User();
  ResponseMsg: string;
  lstUsers: User[];
  constructor(private _projectService: ProjectService) { 
    this.getallUser();
  }

  ngOnInit() {
  }
  

  getallUser() {
    this._projectService.getallUsers().subscribe(res => {
      this.lstUsers = res;
    });
  }
  addUser() {
    this.usrObj.FirstName = this.firstNm;
    this.usrObj.LastName = this.lastNm;
    this.usrObj.EmployeeId = this.empId;
    this._projectService.addUser(this.usrObj).subscribe(r => this.ResponseMsg = r);
  }
}
