import {Body, GET, Path, POST, Query, RebirthHttp} from "rebirth-http";
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import "rxjs/add/operator/map";
import {Operator} from "./operator.model";
import {Page} from "../../../thurder-ng/models/page.model";

@Injectable()
export class OperatorService extends RebirthHttp {
  constructor(http: HttpClient) {
    super(http);
  }

  @GET("operators")
  query(@Query("name") name = "", @Query("pageNo") pageNo = 1,
        @Query("pageSize") pageSize = 10): Observable<Page<any>> {
    return null;
  }

  @GET("operators")
  getAll(@Query("name") name = ""): Observable<Operator[]> {
    return null;
  }

  @GET("operators/:id")
  get(@Path("id") id: number): Observable<Operator> {
    return null
  }

  @POST('operators')
  save(@Body operator: Operator): Observable<Operator> {
    return null;
  }

}
