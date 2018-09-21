import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../Service/project.service';
import { Task } from '../../Model/Task';
import { Project } from '../../Model/Project';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewtask',
  templateUrl: './viewtask.component.html',
  styleUrls: ['./viewtask.component.css']
})
export class ViewtaskComponent implements OnInit {
  searchTitle: string;
  lstItem: Project[];
  selectedproject: Project;
  projectName: string;
  lstTasks: Task[];

  constructor(private _projservice: ProjectService, private _router: Router) {
    this._projservice.getallTasks().subscribe(res => this.lstTasks = res);
  }

  ngOnInit() {
  }

  onPrjSearchClick() {
    this.searchTitle = "Search Projects";
    this._projservice.getallProjects().subscribe(res => this.lstItem = res);
    //this.lstItem = ["Receivables Edge", "AON Carrier Link", "AON Bridge", "Remit One"];
  }
  handleChange(evt) {
    this.selectedproject = evt;
    console.log(evt);
  }
  onSelection() {
    if (this.selectedproject.ProjectID > 0) {
      this.projectName = this.selectedproject.ProjectName;
    }
  }

  editTask(obj) {
    this._router.navigate(['updatetask',obj.TaskID]);
  }
}
