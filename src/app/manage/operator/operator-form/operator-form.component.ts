import {Component, EventEmitter, OnInit} from "@angular/core";
import {Modal} from "rebirth-ng";
import {Operator} from "../shared/operator.model";
import {OperatorService} from "../shared/operator.service";

@Component({
  selector: 'app-operator-form',
  templateUrl: "./operator-form.component.html"
})
export class OperatorFormComponent implements Modal, OnInit {
  context: { id: number };
  dismiss: EventEmitter<Operator>;

  operator: any = {}

  constructor(private operatorService: OperatorService) {
  }

  ngOnInit(): void {
    console.log('ModalTestComponent init....');
    this.operatorService.get(this.context.id).subscribe(
      (operator) => {
        this.operator = operator
      }
    )
  }

  save() {
    this.operatorService.save(this.operator).subscribe(
      (operator) => {
        this.dismiss.emit(operator);
      }
    )
  }

  cancel() {
    this.dismiss.error(this.operator);
  }
}

