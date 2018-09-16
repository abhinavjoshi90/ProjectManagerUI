import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {
  
  firstNm:string;
  lastNm:string;
  empId:number;
  constructor() { }
 
  ngOnInit() {
  }

}
