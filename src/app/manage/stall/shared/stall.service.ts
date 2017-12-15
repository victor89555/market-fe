import {Body, GET, Path, POST, Query, RebirthHttp, PUT, DELETE} from "rebirth-http";
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import "rxjs/add/operator/map";
import {Stall} from "./stall.model";
import {Page} from "../../../thurder-ng/models/page.model";
import {Market} from "../../market/shared/market.model";

@Injectable()
export class StallService extends RebirthHttp {
  constructor(http: HttpClient) {
    super(http);
  }

  @GET("stalls")
  query(@Query("_filter_eq_market_id-int") market:number,@Query("_filter_eq_shop_id-int") shop = "",@Query("_filter_eq_func_type-int") func = "",
        @Query("_filter_eq_status-int") status = "", @Query("_filter_like_name") name = "", @Query("pageNo") pageNo = 1,
        @Query("pageSize") pageSize = 10): Observable<Page<any>> {
    return null;
  }

  getStalls(marketId): Observable<Stall[]> {
    return this.query(marketId, null, null, null, null, 1, 1000).map((page)=>{
      return page.items || []
    });
  }

  @GET("stalls/:id")
  get(@Path("id") id: number): Observable<Stall> {
    return null
  }

  @POST('stalls')
  save(@Body stall: Stall): Observable<Stall> {
    return null;
  }

  @PUT("stalls/:id")
  update( @Path("id") id: number, @Body stall: Stall): Observable<Stall> {
    return null;
  }

  @DELETE("stalls/:id")
  delete( @Path("id") id: number): Observable<any> {
    return null;
  }
}
