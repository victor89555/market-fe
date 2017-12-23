import {Body, GET, Path, POST, Query, RebirthHttp, PUT, DELETE} from "rebirth-http";
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import "rxjs/add/operator/map";
import {Contract} from "./contract.model";
import {Page} from "../../../thurder-ng/models/page.model";
import {ElectronicScale} from "../../electronicScale/shared/electronicScale.model";

@Injectable()
export class ContractService extends RebirthHttp {
  constructor(http: HttpClient) {
    super(http);
  }

  @GET("contracts")
  query(@Query("pageNo") pageNo = null, @Query("pageSize") pageSize = null,
        @Query("_filter_eq_shop_id-long") shopId = null,
        @Query("_filter_like_shop_name") shopName = '',
        @Query("_filter_eq_market_id-long") marketId = null): Observable<Page<any>> {
    return null
  }

  @GET("contracts")
  getAll(@Query("name") name = ""): Observable<Contract[]> {
    return null
  }

  @GET("contracts/:id/attachments")
  getAttachments(@Path("id") id: number): Observable<any[]> {
    return null
  }

  @GET("contracts/:id")
  get(@Path("id") id: number): Observable<Contract> {
    return null
  }

  @DELETE("contracts/:id")
  deleteContract(@Path("id") id: number): Observable<any[]> {
    return null
  }

  @PUT("contracts/:id")
  update( @Path("id") id: number, @Body contract: Contract): Observable<Contract> {
    return null;
  }
  @POST('contracts')
  add(@Body contract: Contract): Observable<Contract> {
    return null;
  }
}
