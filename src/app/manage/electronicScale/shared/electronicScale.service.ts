import {Body, DELETE, GET, Path, POST, PUT, Query, RebirthHttp} from "rebirth-http";
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import "rxjs/add/operator/map";
import {ElectronicScale} from "./electronicScale.model";
import {Page} from "../../../thurder-ng/models/page.model";

@Injectable()
export class ElectronicScaleService extends RebirthHttp {
  constructor(http: HttpClient) {
    super(http);
  }

  @GET("electronicScales")
  query(@Query("pageNo") pageNo = 1, @Query("pageSize") pageSize = 10,
        @Query("_filter_like_sequence_no") sequence = "", @Query("_filter_eq_market_id-long") marketId = "",
        @Query("_filter_eq_status-int") status = null,
        @Query("_filter_eq_used-int") used = null, @Query("_filter_eq_shop_id-long") shopId = ""): Observable<Page<any>> {
    return null;
  }

  getAllotableElectronic(marketId): Observable<ElectronicScale[]> {
    return this.query(1, 100000, null, marketId, null, 0, null).map((page) => {
      return page.items || []
    })
  }

  getAllotedElectronic(marketId, shopId): Observable<ElectronicScale[]> {
    return this.query(1, 100000, null, marketId, null, null, shopId).map((page) => {
      return page.items || []
    })
  }

  @GET("electronicScales/:id")
  get(@Path("id") id: number): Observable<ElectronicScale> {
    return null;
  }

  @POST('electronicScales')
  save(@Body electronicScale: ElectronicScale): Observable<ElectronicScale> {
    return null;
  }

  @PUT("electronicScales/:id/bind")
  bind(@Path("id") id: number, @Body electronicScale: ElectronicScale): Observable<any> {
    return null;
  }

  @PUT("electronicScales/:id/unbind")
  unbind(@Path("id") id: number): Observable<any> {
    return null;
  }

  @PUT("electronicScales/:id")
  update(@Path("id") id: number, @Body electronicScale: ElectronicScale): Observable<ElectronicScale> {
    return null;
  }

  @DELETE("electronicScales/:id")
  delete(@Path("id") id: number): Observable<any> {
    return null;
  }

  @GET("electronicScaleHis")
  getElectronicScaleHis(@Query("pageNo") pageNo = 1, @Query("pageSize") pageSize = 10,
                        @Query("_filter_eq_scale_id-long") id:number): Observable<Page<any>> {
    return null
  }

  //修改状态
  @PUT("electronicScales/:id/changeStatus")
  setStatus(@Path("id") id: number,@Query("status") status: number){
    return null;
  }
}
