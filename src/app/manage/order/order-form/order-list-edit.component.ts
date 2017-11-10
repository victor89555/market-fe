import {Component, ComponentFactoryResolver, EventEmitter, OnInit} from "@angular/core";
import {Modal, ModalService} from "rebirth-ng";

@Component({
  selector: 'app-inline-edit-demo',
  template: `
    <div>
      <div class="modal-demo">
        <button class="btn btn-default" (click)="openModal();">Open modal!</button>
      </div>
      <ngx-datatable
        #mydatatable
        class="material"
        [headerHeight]="50"
        [limit]="5"
        [columnMode]="'force'"
        [footerHeight]="50"
        [rowHeight]="'auto'"
        [rows]="rows">
        <ngx-datatable-column name="Name">
          <ng-template ngx-datatable-cell-template let-rowIndex="rowIndex" let-value="value" let-row="row" >
            <span title="双击修改" (dblclick)="editing[rowIndex + '-name'] = true" *ngIf="!editing[rowIndex + '-name']">
              {{value}}
            </span>
            <input autofocus (blur)="updateValue($event, 'name', rowIndex)" *ngIf="editing[rowIndex+ '-name']" type="text" [value]="value"/>
          </ng-template>
        </ngx-datatable-column>
        <ngx-datatable-column name="Gender">
          <ng-template ngx-datatable-cell-template let-rowIndex="rowIndex" let-row="row" let-value="value">
             <span title="双击修改" (dblclick)="editing[rowIndex + '-gender'] = true" *ngIf="!editing[rowIndex + '-gender']">
              {{value}}
            </span>
            <select *ngIf="editing[rowIndex + '-gender']" (change)="updateValue($event, 'gender', rowIndex)" [value]="value">
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </ng-template>
        </ngx-datatable-column>
        <ngx-datatable-column name="Age">
          <ng-template ngx-datatable-cell-template let-value="value">
            {{value}}
          </ng-template>
        </ngx-datatable-column>
      </ngx-datatable>
    </div>
  `
})
export class InlineEditComponent {
  editing = {};
  rows = [];

  constructor(private modalService: ModalService, private componentFactoryResolver: ComponentFactoryResolver) {
    this.fetch((data) => {
      this.rows = data;
    });
  }
  openModal() {
    this.modalService.open<string>({
      component: ModalTestComponent,
      componentFactoryResolver: this.componentFactoryResolver,
      resolve: {
        text: 'I am from resolve data!'
      }
    })
      .subscribe(data => {
        console.log('Rebirth Modal -> Get ok with result:', data);
      }, error => {
        console.error('Rebirth Modal -> Get cancel with result:', error);
      });
  }
  fetch(cb) {
    cb([{
      "name": "Ethel Price",
      "gender": "female",
      "company": "Johnson, Johnson and Partners, LLC CMP DDC",
      "age": 22
    },
      {
        "name": "Claudine Neal",
        "gender": "female",
        "company": "Sealoud",
        "age": 55
      },
      {
        "name": "Beryl Rice",
        "gender": "female",
        "company": "Velity",
        "age": 67
      },
      {
        "name": "Wilder Gonzales",
        "gender": "male",
        "company": "Geekko"
      },
      {
        "name": "Georgina Schultz",
        "gender": "female",
        "company": "Suretech"
      },
      {
        "name": "Carroll Buchanan",
        "gender": "male",
        "company": "Ecosys"
      }])
  }

  updateValue(event, cell, rowIndex) {
    console.log('order editing rowIndex', rowIndex)
    this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
    console.log('UPDATED!', this.rows[rowIndex][cell]);
  }

}


@Component({
  selector: 're-modal-test',
  template: `
    <div class="modal-header">
      <button type="button" class="close" data-dismiss="modal" aria-label="Close" (click)="cancel()">
        <span aria-hidden="true">&times;</span></button>
      <h4 class="modal-title">I'm a rebirth modal!</h4>
    </div>
    <div class="modal-body">
      <form class="form-horizontal">
        <div class="form-group">
          <label for="textInput" class="col-sm-2 control-label">Text:</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="textInput" name="text" [(ngModel)]="context.text" />
          </div>
        </div>
      </form>
      <hr>
      <strong>Modal context:</strong> <pre>{{context | json}}</pre>
      <hr>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-primary" (click)="ok()">Ok</button>
      <button type="button" class="btn btn-warning" (click)="cancel()">Cancel</button>
    </div>`
})
export class ModalTestComponent implements Modal, OnInit {

  context: { text: string };
  dismiss: EventEmitter<string>;

  constructor(private modalService: ModalService, private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit(): void {
    console.log('ModalTestComponent init....');
  }

  show() {
    this.modalService.open<string>({
      component: ModalTestComponent,
      componentFactoryResolver: this.componentFactoryResolver,
      resolve: {
        text: 'inner modal'
      },
      size: 'sm'
    })
      // .subscribe(data => {
      //   console.log('Rebirth Modal -> Get ok with result:', data);
      // }, error => {
      //   console.error('Rebirth Modal -> Get cancel with result:', error);
      // });
  }

  ok() {
    this.dismiss.emit(this.context.text);
  }

  cancel() {
    this.dismiss.error(this.context.text);
  }
}

