import { Component, OnInit } from '@angular/core';
import {ElectronicScaleService} from "../shared/electronicScale.service";
import {ElectronicScaleHistory} from "../shared/electronicScale.model";

@Component({
  selector: 'app-electronic-scale-history',
  templateUrl: './electronic-scale-history.component.html',
  styleUrls: ['./electronic-scale-history.component.scss']
})
export class ElectronicScaleHistoryComponent implements OnInit {



  context:{id: number}
  historyList: ElectronicScaleHistory[] = []
  constructor(private electronicScaleService: ElectronicScaleService) { }

  ngOnInit() {
    this.getHistory()
  }

  getHistory() {
    this.electronicScaleService.getElectronicScaleHis(this.context.id).subscribe(
      (page) => {
        this.historyList = page.items
      }
    )
  }

}
