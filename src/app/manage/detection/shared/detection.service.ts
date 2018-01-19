/**
 * Created by chenshixiong on 2018/1/19.
 */

import {Body, GET, Path, POST, Query, RebirthHttp} from "rebirth-http";
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import "rxjs/add/operator/map";
import { Detection } from "./detection.model"
import {Page} from "../../../thurder-ng/models/page.model";

@Injectable()
export class DetectionService extends RebirthHttp {
  constructor(http: HttpClient) {
    super(http);
  }

  @GET("detectionRecords")
  query(@Query("_filter_eq_market_id-long") marketId = null, @Query("_filter_like_stall_name") stallName = "",
        @Query("	_filter_like_sample_name") sampleName = null,
        @Query("pageNo") pageNo :number, @Query("pageSize") pageSize:number): Observable<Page<any>> {
    return null;
  }

  @GET("detectionRecords/:id")
  get(@Path("id") id: number): Observable<Detection> {
    return null
  }

}
