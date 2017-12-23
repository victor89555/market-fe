import {Body, GET, Path, POST, PUT, Query, RebirthHttp} from "rebirth-http";
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

  /*@PUT('shops/:id')
  edit(@Path('id') id: number): Observable<Shop> {
    return null;
  }*/
}
