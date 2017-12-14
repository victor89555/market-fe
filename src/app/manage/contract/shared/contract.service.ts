import {Body, GET, Path, POST, Query, RebirthHttp} from "rebirth-http";
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import "rxjs/add/operator/map";
import {Contract} from "./contract.model";
import {Page} from "../../../thurder-ng/models/page.model";

@Injectable()
export class ContractService extends RebirthHttp {
  constructor(http: HttpClient) {
    super(http);
  }

  @GET("contracts")
  query(@Query("_filter_eq_shop_id-long") shopId = null, @Query("pageNo") pageNo = 1,
        @Query("pageSize") pageSize = 10): Observable<Page<any>> {
    return null;
  }

  @GET("contracts")
  getAll(@Query("name") name = ""): Observable<Contract[]> {
    return null;
  }

  @GET("contracts/:id")
  get(@Path("id") id: number): Observable<Contract> {
    return null
  }

  @POST('contracts')
  save(@Body contract: Contract): Observable<Contract> {
    return null;
  }
}
