import {Body, GET, Path, POST, Query, RebirthHttp} from "rebirth-http";
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import "rxjs/add/operator/map";
import { Role } from "./role.model";
import {Page} from "../../../thurder-ng/models/page.model"

@Injectable()
export class RoleService extends RebirthHttp {
  constructor(http: HttpClient) {
    super(http);
  }

  @GET("roles")
  query(@Query("name") name = "", @Query("pageNo") pageNo = 1,
        @Query("pageSize") pageSize = 10): Observable<Page<any>> {
    return null;
  }

  @GET("roles")
  getAll(@Query("name") name = ""): Observable<Role[]> {
    return null;
  }

  @GET("resource")
  getResource(@Query("name") name = ""): Observable<Role[]> {
    return null;
  }

  @GET("roles/:id")
  get(@Path("id") id: number): Observable<Role> {
    return null
  }

  @POST('roles')
  save(@Body role: Role): Observable<Role> {
    return null;
  }

}
