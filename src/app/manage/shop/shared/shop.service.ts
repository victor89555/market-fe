import {Body, GET, Path, POST, PUT, Query, DELETE,RebirthHttp} from "rebirth-http";
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import "rxjs/add/operator/map";
import {Shop} from "./shop.model";
import {Page} from "../../../thurder-ng/models/page.model";

@Injectable()
export class ShopService extends RebirthHttp {
  constructor(http: HttpClient) {
    super(http);
  }

  @GET("shops")
  query(@Query("_filter_eq_market_id-long") market = "", @Query("_filter_like_name") shopName = "",
        @Query("_filter_like_stall_name") stallName = "", @Query("_filter_eq_status-int") status = null,
        @Query("pageNo") pageNo = 1, @Query("pageSize") pageSize = 10): Observable<Page<any>> {
    return null;
  }

  getAll(marketId): Observable<Shop[]> {
    return this.query(marketId, null, null, null, 1, 10000).map((page) => {
      return page.items || []
    })
  }

  @GET("shops/:id")
  get(@Path("id") id: number): Observable<Shop> {
    return null
  }

  @POST('shops')
  add(@Body shop: Shop): Observable<Shop> {
    return null;
  }

  @PUT('shops/:id')
  save(@Path("id") id: number, @Body shop: Shop): Observable<Shop> {
    return null;
  }

  @PUT('shops/:id/changeStall')
  changeStall(@Path("id") id: number, @Query("stallId") stallId: number): Observable<Shop> {
    return null;
  }

  //获取商户相关的统计
  @GET("reports/shop")
  getShopStatistics(@Query("shopId") shopId = null,@Query("beginTime") beginTime = "",@Query("endTime") endTime = "",
                      @Query("dimension") dimension:number): Observable<any> {
    return null;
  }

  // 获取商户营业执照附件
  @GET("shops/:id/attachments")
  getBusinessLicense(@Path("id") id: number): Observable<any[]> {
    return null;
  }

  @DELETE("shops/:id")
  delete(@Path("id") id: number): Observable<any> {
    return null;
  }
}
