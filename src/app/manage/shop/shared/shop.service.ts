import {Body, GET, Path, POST, Query, RebirthHttp} from "rebirth-http";
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import "rxjs/add/operator/map";
import {Shop} from "./shop.model";

@Injectable()
export class ShopService extends RebirthHttp {
  constructor(http: HttpClient) {
    super(http);
  }

  @GET("shops")
  query(@Query("name") name = "", @Query("pageIndex") pageIndex = 1,
        @Query("pageSize") pageSize = 10): Observable<Shop[]> {
    return null;
  }

  @GET("shops/:id")
  get(@Path("id") id: number): Observable<Shop> {
    return null
  }

  @POST('login')
  save(@Body shop: Shop): Observable<Shop> {
    return null;
  }

}
