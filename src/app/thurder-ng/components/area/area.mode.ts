/**
 * Created by zhaixm on 2017/12/27.
 */
export class Area {
  /* provinceCode: string
   cityCode: string

   constructor(provinceCode: string = null, cityCode: string = null) {
   this.provinceCode = provinceCode
   this.cityCode = cityCode
   }*/
  provinceCode: { "code": string, "region": string }
  cityCode: { "code": string, "region": string }

  constructor(provinceCode:{ "code": null, "region": null }, cityCode:{ "code": null, "region": null}) {
    this.provinceCode = provinceCode
    this.cityCode = cityCode
  }
}
