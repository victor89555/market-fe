import {Component, ComponentFactoryResolver, OnInit, ViewEncapsulation} from "@angular/core";
import {ModalService} from "rebirth-ng";
import {OperatorFormComponent} from "../operator-form/operator-form.component";
import {OperatorService} from "../shared/operator.service";
import {Operator} from "../shared/operator.model";

@Component({
  selector: 'app-operator-list',
  templateUrl: './operator-list.component.html',
  styleUrls: [
    "./operator-list.component.scss",
  ],
  encapsulation: ViewEncapsulation.None,
  providers: [],
})

export class OperatorListComponent implements OnInit {

  editing = {}
  operators = []
  qry_name: string = ""

  constructor(private modalService: ModalService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private operatorService: OperatorService) {
  }

  ngOnInit(): void {
    this.operatorService.query().subscribe(
      (operators) => {
        this.operators = operators
      }
    )
  }
  query() {
    this.operatorService.query(this.qry_name).subscribe(
      (operators) => {
        this.operators = operators
      }
    )
  }

  reset() {
    this.operatorService.query().subscribe(
      (operators) => {
        this.operators = operators
      }
    )
  }

  add() {
    this.modalService.open<Operator>({
      component: OperatorFormComponent,
      componentFactoryResolver: this.componentFactoryResolver,
      resolve: {
      }
    }).subscribe(operator => {
      console.log('Rebirth Modal -> Get ok with result:', operator)
    }, error => {
      console.error('Rebirth Modal -> Get cancel with result:', error)
    })
  }

  edit(id: number) {
    this.modalService.open<Operator>({
      component: OperatorFormComponent,
      componentFactoryResolver: this.componentFactoryResolver,
      resolve: {
        id: id
      }
    }).subscribe(operator => {
      console.log('Rebirth Modal -> Get ok with result:', operator)
    }, error => {
      console.error('Rebirth Modal -> Get cancel with result:', error)
    })
  }

  updateValue(event, cell, rowIndex) {
    console.log('order editing rowIndex', rowIndex)
    this.editing[rowIndex + '-' + cell] = false
    this.operators[rowIndex][cell] = event.target.value
    this.operators = [...this.operators]
    console.log('UPDATED!', this.operators[rowIndex][cell])
  }
}
