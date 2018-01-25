import {Component, OnInit, EventEmitter} from '@angular/core';
import {MarketService} from "../shared/market.service";
import {formatDate} from "../../../thurder-ng/utils/date-util";

@Component({
  selector: 'app-repair-reports',
  templateUrl: './repair-reports.component.html',
  styleUrls: ['./repair-reports.component.scss']
})
export class RepairReportsComponent implements OnInit {
  repairModal = {'beginTime': "", 'endTime': ""}
  dismiss: EventEmitter<any>;

  constructor(private marketService: MarketService) {
  }

  ngOnInit() {
  }

  repair() {
    console.log("memem")
    let bt = formatDate(new Date(this.repairModal.beginTime), "yyyy-MM-dd hh:mm:ss")
    let et = formatDate(new Date(this.repairModal.endTime), "yyyy-MM-dd hh:mm:ss")
    bt = bt.substr(0,14)+"00:00"
    et = et.substr(0,14)+"00:00"
    this.marketService.repair(bt, et)
      .subscribe((repair) => {
        if(repair){
          this.dismiss.emit(repair)
        }
      })
  }

  cancel() {
    this.dismiss.error(this.repairModal);
  }
}
