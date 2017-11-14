import {Component, EventEmitter, OnInit} from "@angular/core";
import {Modal} from 'rebirth-ng'

@Component({
  selector: 'app-order-form',
  templateUrl: "./order-form.component.html"
})
export class OrderFormComponent implements Modal, OnInit {
  context: { text: string };
  dismiss: EventEmitter<string>;

  constructor() {
  }

  ngOnInit(): void {
    console.log('ModalTestComponent init....');
  }

  ok() {
    this.dismiss.emit(this.context.text);
  }

  cancel() {
    this.dismiss.error(this.context.text);
  }
}

