import {Component, OnInit} from '@angular/core';
import {ElectronicScaleService} from "../shared/electronicScale.service";
import {ElectronicScale} from "../shared/electronicScale.model";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Page} from "../../../thurder-ng/models/page.model";

@Component({
  selector: 'app-electronic-scale-history',
  templateUrl: './electronic-scale-history.component.html',
  styleUrls: ['./electronic-scale-history.component.scss']
})
export class ElectronicScaleHistoryComponent implements OnInit {

  scaleId: number = null
  page: Page<any> = new Page()
  scaleInfo: ElectronicScale = new ElectronicScale()
  constructor(private electronicScaleService: ElectronicScaleService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.scaleId = params['id'];
    });
    this.getHistory()
    this.getElectronicScaleInfo()
  }

  getHistory() {
    this.electronicScaleService.getElectronicScaleHis(1, 10, this.scaleId).subscribe(
      (page) => {
        console.log(page)
        this.page = page
      }
    )
  }

  getElectronicScaleInfo() {
    this.electronicScaleService.get(this.scaleId).subscribe(
      (info) => {
        console.log(info)
        this.scaleInfo = info
      }
    )
  }

  setPage(pageInfo) {
    this.page.pageNo = pageInfo.offset + 1
    this.getHistory()
  }

  goBack() {
    window.history.back()
  }

}
