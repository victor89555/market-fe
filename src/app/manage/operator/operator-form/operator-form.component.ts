import {Component, EventEmitter, OnInit} from "@angular/core";
import {Modal} from "rebirth-ng";
import {Operator} from "../shared/operator.model";
import {OperatorService} from "../shared/operator.service";
import { Validator } from "../../../shared/validator"

@Component({
  selector: 'app-operator-form',
  templateUrl: "./operator-form.component.html"
})
export class OperatorFormComponent implements Modal, OnInit {
  context: { id: number,add:boolean };
  dismiss: EventEmitter<Operator>;

  operator: Operator = new Operator();

  constructor(private operatorService: OperatorService,
               private validator: Validator
  ) {
  }

  ngOnInit(): void {
    console.log('ModalTestComponent init....');
    if(!this.context.add){
      this.getOperator();
    }
  }
  getOperator(){
    this.operatorService.get(this.context.id).subscribe(
      (operator) => {
        this.operator = operator
      }
    )
  }
  save() {
    if(this.validateOperator()){
      console.log("save")
      this.operatorService.save(this.operator).subscribe(
        (operator) => {
          this.dismiss.emit(operator);
        }
      )
    }
  }

  update() {
    if(this.validateOperator()){
      console.log(this.operator);
      this.operatorService.update(this.context.id, this.operator).subscribe(
        (operator) => {
          this.dismiss.emit(operator);
        }
      )
    }
  }
  cancel() {
    this.dismiss.error(this.operator);
  }

  operatorForm = {
    name:true,
    sex:true,
    idCardNo:true,
    idCardNoFormat:true,
    mobile:true,
    mobileFormat:true
  }

  validateOperator() {
    this.validateOperatorIdCarNo()
    this.validateOperatorMobile()
    this.validateOperatorName()
    this.validateOperatorSex()
    return this.operatorForm.mobile &&
        this.operatorForm.idCardNo &&
        this.operatorForm.sex &&
        this.operatorForm.name &&
        this.operatorForm.idCardNoFormat &&
        this.operatorForm.mobileFormat
  }
  validateOperatorName(){
    this.operatorForm.name = this.operator.name ? true : false
  }
  validateOperatorSex(){
    this.operatorForm.sex = this.operator.sex != null
  }
  validateOperatorIdCarNo(){
    this.operatorForm.idCardNo = this.operator.idCardNo ? true : false
    this.operatorForm.idCardNoFormat = this.validator.isCardNo(this.operator.idCardNo)
  }
  validateOperatorMobile(){
    this.operatorForm.mobile = this.operator.mobile ? true : false
    this.operatorForm.mobileFormat = this.validator.isMobile(this.operator.mobile)
  }
}

