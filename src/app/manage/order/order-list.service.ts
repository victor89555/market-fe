import {GET, Query, RebirthHttp} from "rebirth-http";
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import "rxjs/add/operator/map";

@Injectable()
export class OrderListService extends RebirthHttp {
  constructor(http: HttpClient) {
    super(http);
  }

  // article(): Observable {
  //   return this.getArticles()
  //
  // }
  //
  @GET("article")
  getArticles(@Query("pageIndex") pageIndex = 1,
              @Query("pageSize") pageSize = 10): Observable<SearchResult<Article>> {
    return null;
  }
}
