import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../Model/User';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Task } from '../Model/Task';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  
  apiBaseUrl: string = "http://localhost/ProjectManager.Service/api/";
 
  constructor(private _http: HttpClient) { }

  addUser(obj: User): Observable<any> {
    return this._http.post(this.apiBaseUrl + "adduser", obj).pipe(map(res => res));
  }

  getallTasks(): Observable<any> {
    return this._http.get(this.apiBaseUrl + "getalltasks").pipe(map(res => res));
  }

  getallProjects(): Observable<any> {
    return this._http.get(this.apiBaseUrl + "getallprojects").pipe(map(res => res));
  }
}
