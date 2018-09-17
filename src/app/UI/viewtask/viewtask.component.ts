import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-viewtask',
  templateUrl: './viewtask.component.html',
  styleUrls: ['./viewtask.component.css']
})
export class ViewtaskComponent implements OnInit {
  searchTitle: string;
  lstItem: string[];
  selectedprojectName:string;
  projectName:string;
  constructor() { }

  ngOnInit() {
  }

  onPrjSearchClick() {
    this.searchTitle = "Search Projects";
    this.lstItem = ["Receivables Edge", "AON Carrier Link", "AON Bridge", "Remit One"];
  }
  handleChange(evt) {
    this.selectedprojectName = evt;
    console.log(evt);
  }
  onSelection() {
    if (this.selectedprojectName.length > 0) {
      this.projectName = this.selectedprojectName;
    }
  }
}
