/**
 * Created by zhaixm on 2017/12/28.
 */
import {Injectable} from "@angular/core"
import {GET, Path, RebirthHttp} from "rebirth-http"
import {HttpClient} from "@angular/common/http"
import {Observable} from "rxjs/Observable"

@Injectable()
export class AttachmentService extends RebirthHttp {
  constructor(http: HttpClient) {
    super(http);
  }

  @GET("attachments/:id/download")
  private _download(@Path("id") id: number): Observable<any> {
    return null
  }

  download(id) {
    this._download(id).subscribe(data => this.downloadFile(data)),//console.log(data),
      error => console.log("文件下载出错"),
      () => console.info("文件下载完成");
  }

  downloadFile(data: Response) {
    var blob = new Blob([data]);
    // var blob = new Blob([data], {type: 'text/csv'});
    var url = window.URL.createObjectURL(blob);
    window.open(url);
  }

}
