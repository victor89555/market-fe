import {Body, GET, Path, POST, Query, RebirthHttp, DELETE, PUT} from "rebirth-http";
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import "rxjs/add/operator/map";
import {ElectronicScale} from "./electronicScale.model";
import {Page} from "../../../thurder-ng/models/page.model";
import {Market} from "../../market/shared/market.model";

@Injectable()
export class ElectronicScaleService extends RebirthHttp {
  constructor(http: HttpClient) {
    super(http);
  }

  @GET("electronicScales")
  query(@Query("_filter_like_sequence_no") sequence = "", @Query("_filter_eq_market_id-long") market = "",
        @Query("_filter_eq_status-int") status = "", @Query("pageNo") pageNo = 1,
        @Query("pageSize") pageSize = 10): Observable<Page<any>> {
    return null;
  }

  @GET("electronicScales")
  getAll(@Query("name") name = "", @Query("usable") usable = true): Observable<ElectronicScale[]> {
    return null;
  }

  @GET("electronicScales/:id")
  get(@Path("id") id: number): Observable<ElectronicScale> {
    return null
  }

  @POST('electronicScales')
  save(@Body electronicScale: ElectronicScale): Observable<ElectronicScale> {
    return null;
  }

  @PUT("electronicScales/:id")
  update( @Path("id") id: number, @Body electronicScale: ElectronicScale): Observable<ElectronicScale> {
    return null;
  }

  @DELETE("electronicScales/:id")
  delete( @Path("id") id: number): Observable<any> {
    return null;
  }
}
