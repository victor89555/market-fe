/**
 * Created by zhaixm on 2017/10/15.
 */
import {Pipe, PipeTransform} from '@angular/core'
import {dicts} from '../models/dictionary'

/**
 * 字典转换器 code -> name
 */
@Pipe({name: 'dictConvert'})
export class DictConvertPipe implements PipeTransform {
  constructor() {
  }

  transform(value: any, dictName: string): string | null {
    const dict = dicts[dictName]
    if (dict[value]) {
      return dict[value]
    } else {
      return value
    }
  }
}
