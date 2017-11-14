import {GET, Query, RebirthHttp} from "rebirth-http";
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
  getArticles(@Query("pageIndex") pageIndex = 1,
              @Query("pageSize") pageSize = 10): Observable<Order[]> {
    return null;
  }
}
