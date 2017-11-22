import {Body, GET, Path, POST, Query, RebirthHttp} from "rebirth-http";
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
  query(@Query("name") name = "", @Query("pageNo") pageNo = 1,
        @Query("pageSize") pageSize = 10): Observable<Page<any>> {
    return null;
  }

  @GET("electronicScales")
  getAll(@Query("name") name = ""): Observable<ElectronicScale[]> {
    return null;
  }

  @GET("electronicScales/:id")
  get(@Path("id") id: number): Observable<ElectronicScale> {
    return null
  }

  @POST('electronicScales')
  save(@Body electronicScale: ElectronicScale): Observable<ElectronicScale> {
    return null;
  }

}
