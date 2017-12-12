import {Body, GET, Path, POST, Query, RebirthHttp, PUT, DELETE} from "rebirth-http";
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import "rxjs/add/operator/map";
import {Market} from "./market.model";
import {Page} from "../../../thurder-ng/models/page.model"

@Injectable()
export class MarketService extends RebirthHttp {
  constructor(http: HttpClient) {
    super(http);
  }

  @GET("markets")
  query(@Query("_filter_like_name") name = "",@Query("_filter_like_addr") addr = "",@Query("_filter_eq_status-int") status = "",
        @Query("pageNo") pageNo = 1, @Query("pageSize") pageSize = 10): Observable<Page<any>> {
    return null;
  }

  @GET("markets")
  getAll(@Query("name") name = ""): Observable<Market[]> {
    return null;
  }

  @GET("markets/:id")
  get(@Path("id") id: number): Observable<Market> {
    return null
  }

  @POST('markets')
  save(@Body market: Market): Observable<Market> {
    return null;
  }

  @PUT("markets/:id")
  update( @Path("id") id: number, @Body market: Market): Observable<Market> {
    return null;
  }

  @DELETE("markets/:id")
  delete( @Path("id") id: number): Observable<Market> {
    return null;
  }
}
