import {BaseUrl, Body, DELETE, GET, Path, POST, PUT, Query, RebirthHttp} from "rebirth-http";
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import "rxjs/add/operator/map";
import {Personage} from "./personage.model";
import {environment} from "../../../../environments/environment"

@Injectable()
@BaseUrl(environment.auth.host)
export class PersonageService extends RebirthHttp {
  constructor(http: HttpClient) {
    super(http);
  }


  @GET("users/info")
  get(): Observable<Personage> {
    return null;
  }

  @PUT("users/info")
  update(@Body personage: Personage): Observable<Personage> {
    return null;
  }


}
