/**
 * Created by chenshixiong on 2018/1/3.
 */

import {OnInit} from "@angular/core";
import {ifTrue} from "codelyzer/util/function";
export class Validator implements OnInit {
  ngOnInit() {
  }

  // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
  isCardNo(card) {
    let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (reg.test(card)) {
      return true;
    }else {
      return false;
    }
  }
  // 手机号码的验证
  isMobile(mobile){
    let reg =/^1[3|4|5|8][0-9]\d{4,8}$/
    if(reg.test(mobile)){
      return true
    }else {
      return false
    }
  }

  // 纯数字验证
  isNum(num){
    let reg = /^[0-9]*$/
    if(reg.test(num)){
      return true
    }else {
      return false
    }
  }
}
