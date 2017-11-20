import {Component, EventEmitter, OnInit} from "@angular/core";
import {Modal} from "rebirth-ng";
import {Stall} from "../shared/stall.model";
import {StallService} from "../shared/stall.service";

@Component({
  selector: 'app-stall-form',
  templateUrl: "./stall-form.component.html"
})
export class StallFormComponent implements Modal, OnInit {
  context: { id: number };
  dismiss: EventEmitter<Stall>;

  stall: any = {}

  constructor(private stallService: StallService) {
  }

  ngOnInit(): void {
    console.log('ModalTestComponent init....');
    this.stallService.get(this.context.id).subscribe(
      (stall) => {
        this.stall = stall
      }
    )
  }

  save() {
    this.stallService.save(this.stall).subscribe(
      (stall) => {
        this.dismiss.emit(stall);
      }
    )
  }

  cancel() {
    this.dismiss.error(this.stall);
  }
}

