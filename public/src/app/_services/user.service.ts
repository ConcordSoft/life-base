import { Injectable } from '@angular/core';
import { HttpService } from "../_core/index";
import { environment } from '../../environments/environment';
import { User } from '../_model/index';
import { SessionService } from '../_core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
@Injectable()
export class UserService {
    apiUrl: string = environment.apiUrl;

    constructor(private http: HttpService, private _SesionService: SessionService) { }

    register(user: Object) {
        return this.http.post(this.apiUrl + '/user/register', user).map((res) => res.json());
    }
    
    login(email: string, password: string) {
        return this.http.post(this.apiUrl + '/user/login', { em: email, pw: password }).map((res) => res.json());
    }

    addCourseToUser(courseName: string) {
      return this.http.post(this.apiUrl + '/user/' + this._SesionService.getUserId() + '/addCourse', {courseName: courseName})
      .map((res) => res.json());
    }

    checkIfPayedCourse(courseName: string) {
      return this.http.post(this.apiUrl + '/user/' + this._SesionService.getUserId() + '/checkCourse', {courseName: courseName})
      .map((res) => res.json());
    }
    
}
