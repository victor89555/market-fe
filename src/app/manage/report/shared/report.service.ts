import {Body, GET, Path, POST, Query, RebirthHttp} from "rebirth-http";
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import "rxjs/add/operator/map";
import {Page} from "../../../thurder-ng/models/page.model";
import {MounthReport} from "./report.model";


@Injectable()
export class ReportService extends RebirthHttp {
  constructor(http: HttpClient) {
    super(http);
  }

  @GET("reports/month")
  query(@Query("marketId") marketId = null, @Query("month") month = ""): Observable<MounthReport> {
    return null;
  }

}
