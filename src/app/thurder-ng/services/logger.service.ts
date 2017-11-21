import {Injectable} from '@angular/core'

/**
 * Created by zhaixm on 2017/7/11.
 */

@Injectable()
export class LoggerService {

  static LEVEL = {
    'DEBUG': 1,
    'INFO': 2,
    'WARN': 3,
    'ERROR': 4,
  }

  private level: number = LoggerService.LEVEL.DEBUG

  debug(...msg) {
    if (this.level <= LoggerService.LEVEL.DEBUG) {
      console.log(msg)
    }
  }

}
