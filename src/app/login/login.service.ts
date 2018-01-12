import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {AuthorizationService} from 'rebirth-permission';
import {HttpClient} from '@angular/common/http';
import {CurrentUser} from '../shared/model/current-user.model';
import 'rxjs/add/operator/map';
import {environment} from "../../environments/environment"

@Injectable()
export class LoginService {

  constructor(private http: HttpClient,
              private authorizationService: AuthorizationService) {
  }

  login(loginInfo: { loginName: string; password: string }): Observable<CurrentUser> {
    const authorizationService = this.authorizationService
    return this.innerLogin(loginInfo)
      .map(user => {
        authorizationService.setCurrentUser(user)
        return user
      })
  }

  innerLogin(loginInfo): Observable<CurrentUser> {
    return this.http.post<CurrentUser>(`${environment.auth.host}/login`, loginInfo).map((data: any) => {
      let currentUser = new CurrentUser()
      currentUser.id = data.userId
      currentUser.name = data.userName
      currentUser.token = data.token
      currentUser.roles = data.resources
      return currentUser
    })
  }


}
