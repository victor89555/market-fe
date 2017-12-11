import {Body, GET, Path, POST, Query, RebirthHttp} from "rebirth-http";
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import "rxjs/add/operator/map";
import { Member } from "./member.model";
import { Page } from "../../../thurder-ng/models/page.model"

@Injectable()
export class MemberService extends RebirthHttp {
  constructor(http: HttpClient) {
    super(http);
  }

  @GET("members")
  query(@Query("name") name = "", @Query("pageNo") pageNo = 1,
        @Query("pageSize") pageSize = 10): Observable<Page<any>> {
    return null;
  }

  @GET("members")
  getAll(@Query("name") name = ""): Observable<Member[]> {
    return null;
  }

  @GET("members/:id")
  get(@Path("id") id: number): Observable<Member> {
    return null
  }

  @POST("members")
  save(@Body member: Member): Observable<Member> {
    return null;
  }
}
