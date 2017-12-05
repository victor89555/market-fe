import {Body, GET, Path, POST, Query, RebirthHttp} from "rebirth-http";
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import "rxjs/add/operator/map";
import {Order, OrderLine} from "./order.model";
import {Page} from "../../../thurder-ng/models/page.model";

@Injectable()
export class OrderService extends RebirthHttp {
  constructor(http: HttpClient) {
    super(http);
  }

  @GET("orders")
  query(@Query("name") name = "", @Query("pageNo") pageNo = 1,
        @Query("pageSize") pageSize = 10): Observable<Page<any>> {
    return null;
  }

  @GET("orders/:id")
  get(@Path("id") id: number): Observable<Order> {
    return null
  }

  @GET("orderLines/:id")
  getLine(@Path("id") id: number): Observable<OrderLine> {
    return null
  }

  @GET("orders")
  getAll(@Query("name") name = ""): Observable<Order[]> {
    return null;
  }

  @POST('orders')
  save(@Body order: Order): Observable<Order> {
    return null;
  }

}
