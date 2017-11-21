/**
 * Created by zhaixm on 2017/10/15.
 */
import {Pipe, PipeTransform} from '@angular/core'

/**
 * 字典转entry数组 {1:"男", 2:"女"} -> [{"key":1, "value":"男"}, {"key":2, "value":"女"}]
 */
@Pipe({name: 'entrys'})
export class EntrysPipe implements PipeTransform {
  transform(value, args: string[]): any {
    let entrys = [];
    for (let key in value) {
      entrys.push({key: key, value: value[key]});
    }
    return entrys;
  }
}
