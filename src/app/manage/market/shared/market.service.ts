import {Body, GET, Path, POST, Query, RebirthHttp} from "rebirth-http";
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import "rxjs/add/operator/map";
import {Market} from "./market.model";

@Injectable()
export class MarketService extends RebirthHttp {
  constructor(http: HttpClient) {
    super(http);
  }

  @GET("markets")
  query(@Query("name") name = "", @Query("pageIndex") pageIndex = 1,
        @Query("pageSize") pageSize = 10): Observable<Market[]> {
    return null;
  }

  @GET("market/:id")
  get(@Path("id") id: number): Observable<Market> {
    return null
  }

  @POST('login')
  save(@Body market: Market): Observable<Market> {
    return null;
  }

}
