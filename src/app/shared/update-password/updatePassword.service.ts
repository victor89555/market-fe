import {BaseUrl, Body, PUT, RebirthHttp} from "rebirth-http";
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import "rxjs/add/operator/map";
import {environment} from "../../../environments/environment"

@Injectable()
@BaseUrl(environment.auth.host)
export class UpdatePasswordService extends RebirthHttp {
  constructor(http: HttpClient) {
    super(http);
  }

  @PUT("users/modifyPwd")
  update(@Body password: any): Observable<any> {
    return null;
  }


}

