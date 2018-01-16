import {BaseUrl, Body, GET, Path, POST, PUT, Query,DELETE, RebirthHttp} from "rebirth-http";
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import "rxjs/add/operator/map";
import {Page} from "../../../thurder-ng/models/page.model"
import {environment} from "../../../../environments/environment"
import {Resource} from "./resource.model"
import {ResourceNode} from "./resourceNode.model"

@Injectable()
@BaseUrl(environment.auth.host)
export class ResourceService extends RebirthHttp {
  constructor(http: HttpClient) {
    super(http);
  }

  @GET("resources")
  query(@Query("name") name = "", @Query("pageNo") pageNo = 1,
        @Query("pageSize") pageSize = 10): Observable<Page<any>> {
    return null;
  }

  @GET("resources/:id")
  get(@Path("id") id: number): Observable<Resource> {
    return null
  }

  @GET("resources/tree")
  getTreeData(): Observable<any> {
    return null
  }

  @POST('resources')
  save(@Body resource: Resource): Observable<Resource> {
    return null;
  }

  @PUT("resources/:id")
  update( @Path("id") id: number, @Body resource: Resource): Observable<Resource> {
    return null;
  }


  @POST('resources')
  saveNode(@Body resourceNode: ResourceNode): Observable<ResourceNode> {
    return null;
  }

  @DELETE("resources/:id")
  deleteNode( @Path("id") id: number): Observable<any> {
    return null;
  }

  @PUT("resources/:id")
  updateNode( @Path("id") id: number, @Body resourceNode: ResourceNode): Observable<ResourceNode> {
    return null;
  }

  @GET("resources/:id")
  getNode(@Path("id") id: number): Observable<ResourceNode> {
    return null
  }
}
