import {Body, GET, Path, POST, Query, RebirthHttp,PUT, DELETE} from "rebirth-http";
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import "rxjs/add/operator/map";
import { Member } from "./member.model";
import { Page } from "../../../thurder-ng/models/page.model"
import {Operator} from "../../operator/shared/operator.model";

@Injectable()
export class MemberService extends RebirthHttp {
  constructor(http: HttpClient) {
    super(http);
  }

  @GET("members")
  query(@Query("_filter_like_name") name = "",@Query("_filter_like_mobile") mobile = "",@Query("_filter_like_card_no") cardNo = "",
        @Query("_filter_like_id_card_no") idCard = "",
        @Query("pageNo") pageNo = null, @Query("pageSize") pageSize = null): Observable<Page<any>> {
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
  @PUT("members/:id")
  update( @Path("id") id: number, @Body member: Member): Observable<Member> {
    return null;
  }

  @DELETE("members/:id")
  delete( @Path("id") id: number): Observable<any> {
    return null;
  }
}
