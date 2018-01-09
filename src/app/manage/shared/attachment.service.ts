/**
 * Created by zhaixm on 2017/12/28.
 */
import {Injectable} from "@angular/core"
import {GET, Path, RebirthHttp} from "rebirth-http"
import {HttpClient} from "@angular/common/http"
import {Observable} from "rxjs/Observable"
import {environment} from "../../../environments/environment"

@Injectable()
export class AttachmentService extends RebirthHttp {
  constructor(http: HttpClient) {
    super(http)
  }

  @GET("attachments/:id/download")
  private _download(@Path("id") id: number): Observable<any> {
    return null
  }

  download(id, fileName) {
    const apiHost = environment.api.host
    this.http.get(`${apiHost}/attachments/${id}/download`, {
      responseType: "blob"
    }).subscribe((data: Blob) => this.downloadFile(data, fileName)),//console.log(data),
      error => console.log("文件下载出错"),
      () => console.info("文件下载完成")
  }

  private downloadFile(data: Blob, fileName) {
    // var blob = new Blob([data], {type: 'text/csv'})
    // var url = URL.createObjectURL(data)
    // window.open(url)
    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(data);
    link.download = fileName;
    link.click();
  }

}
