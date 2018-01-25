import {Body, DELETE, GET, Path, POST, PUT, Query, RebirthHttp} from "rebirth-http";
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

  simpleQuery(params: { name: string, addr: string, status: number, provinceCode: string, cityCode: string }, pageNo: number = 1, pageSize: number = 10) {
    return this.query(params.name, params.addr, params.status, params.provinceCode, params.cityCode, pageNo, pageSize)
  }

  @GET("markets")
  query(@Query("_filter_like_name") name = "", @Query("_filter_like_addr") addr = "", @Query("_filter_eq_status-int") status = null,
        @Query("_filter_like_provinceCode") provinceCode = null, @Query("_filter_like_cityCode") cityCode = null,
        @Query("pageNo") pageNo = 1, @Query("pageSize") pageSize = 10): Observable<Page<any>> {
    return null;
  }

  @GET("markets/all")
  getAll(@Query("status") name = ""): Observable<Market[]> {
    return null;
  }

  @GET("markets/:id")
  get(@Path("id") id: number): Observable<Market> {
    return null;
  }

  @POST('markets')
  save(@Body market: Market): Observable<Market> {
    return null;
  }

  @PUT("markets/:id")
  update(@Path("id") id: number, @Body market: Market): Observable<Market> {
    return null;
  }

  @DELETE("markets/:id")
  delete(@Path("id") id: number): Observable<any> {
    return null;
  }

 //获取市场统计
  @GET("reports/market")
  getMarketStatistics(@Query("marketId") marketId = null,@Query("beginTime") beginTime = "",@Query("endTime") endTime = "",
                      @Query("dimension") dimension:number): Observable<any> {
    return null;
  }

  //修复数据
  @GET("reports/repair")
  repair(@Query("beginTime")beginTime = "",@Query("endTime")endTime = ""): Observable<any> {
    return null;
  }
}
