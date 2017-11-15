import {Body, GET, Path, POST, Query, RebirthHttp} from "rebirth-http";
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import "rxjs/add/operator/map";
import {Order} from './order.model'

@Injectable()
export class OrderService extends RebirthHttp {
  constructor(http: HttpClient) {
    super(http);
  }

  @GET("orders")
  query(@Query("name") name = "", @Query("pageIndex") pageIndex = 1,
        @Query("pageSize") pageSize = 10): Observable<Order[]> {
    return null;
  }

  @GET("orders/:id")
  get(@Path("id") id: number): Observable<Order> {
    return null
  }

  @POST('login')
  save(@Body order: Order): Observable<Order> {
    return null;
  }

}
