import {Body, GET, Path, POST, Query, RebirthHttp,DELETE,PUT} from "rebirth-http";
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import "rxjs/add/operator/map";
import {Operator} from "./operator.model";
import {Page} from "../../../thurder-ng/models/page.model";
import {ElectronicScale} from "../../electronicScale/shared/electronicScale.model";

@Injectable()
export class OperatorService extends RebirthHttp {
  constructor(http: HttpClient) {
    super(http);
  }

  @GET("operators")
  query(@Query("_filter_like_name") name = "",@Query("_filter_like_mobile") mobile = "", @Query("pageNo") pageNo = null,
        @Query("pageSize") pageSize = null): Observable<Page<any>> {
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

  @PUT("operators/:id")
  update( @Path("id") id: number, @Body operator: Operator): Observable<Operator> {
    return null;
  }

  @DELETE("operators/:id")
  delete( @Path("id") id: number): Observable<any> {
    return null;
  }
}
