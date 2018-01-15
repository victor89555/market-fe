import {BaseUrl, Body, DELETE, GET, Path, POST, PUT, Query, RebirthHttp} from "rebirth-http";
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import "rxjs/add/operator/map";
import {User} from "./user.model";
import {Page} from "../../../thurder-ng/models/page.model"
import {environment} from "../../../../environments/environment"

@Injectable()
@BaseUrl(environment.auth.host)
export class UserService extends RebirthHttp {
  constructor(http: HttpClient) {
    super(http);
  }

  @GET("users")
  query(@Query("name") name = "", @Query("pageNo") pageNo = 1,
        @Query("pageSize") pageSize = 10): Observable<Page<any>> {
    return null;
  }

  @GET("users")
  getAll(@Query("name") name = ""): Observable<User[]> {
    return null;
  }

  @GET("users/:id")
  get(@Path("id") id: number): Observable<User> {
    return null
  }

  @POST('users')
  save(@Body users: User): Observable<User> {
    return null;
  }

  @PUT("users/:id")
  update(@Path("id") id: number, @Body user: User): Observable<User> {
    return null;
  }

  @DELETE("users/:id")
  delete(@Path("id") id: number): Observable<any> {
    return null;
  }

}
