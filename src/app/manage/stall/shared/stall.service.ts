import {Body, GET, Path, POST, Query, RebirthHttp} from "rebirth-http";
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import "rxjs/add/operator/map";
import {Stall} from "./stall.model";
import {Page} from "../../../thurder-ng/models/page.model";

@Injectable()
export class StallService extends RebirthHttp {
  constructor(http: HttpClient) {
    super(http);
  }

  @GET("stalls")
  query(@Query("name") name = "", @Query("pageNo") pageNo = 1,
        @Query("pageSize") pageSize = 10): Observable<Page<any>> {
    return null;
  }

  @GET("stalls")
  getAll(@Query("name") name = ""): Observable<Stall[]> {
    return null;
  }

  @GET("stalls/:id")
  get(@Path("id") id: number): Observable<Stall> {
    return null
  }

  @POST('stalls')
  save(@Body stall: Stall): Observable<Stall> {
    return null;
  }

}
