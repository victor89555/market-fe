import {Component, OnInit, EventEmitter} from '@angular/core';
import {Personage} from '../shared/personage.model'
import {PersonageService} from '../shared/personage.service'
import {Validator} from '../../validator'
@Component({
  selector: 'app-update-info',
  templateUrl: './update-info.component.html',
  styleUrls: ['./update-info.component.scss']
})
export class UpdateInfoComponent implements OnInit {
  context: { id: number };
  dismiss: EventEmitter<Personage>;
  personage = new Personage();

  constructor(private personageService: PersonageService,
              private validator: Validator) {
  }

  ngOnInit() {
    this.getPersonage()
  }

  getPersonage() {
    this.personageService.get().subscribe((personage) => {
      this.personage = personage
      console.log(this.personage)
    })
  }

  update() {
    if(this.validatePersonage()){
      this.personageService.update(this.personage).subscribe(
        (personage) => {
          this.dismiss.emit(personage);
        }
      )
    }
  }

  cancel() {
    this.dismiss.error(this.personage);
  }

  // 表单验证

  validateForm = {
    name: true,
    sex: true,
    mobile: true,
    mobileFormat: true
  }

  validatePersonage() {
    this.validateForm.name = this.personage.name ? true : false
    this.validateForm.sex = this.personage.sex != null
    this.validateForm.mobile = this.personage.mobile ? true : false
    this.validateForm.mobileFormat = this.validator.isMobile(this.personage.mobile)
    return this.validateForm.name &&
      this.validateForm.sex &&
      this.validateForm.mobile &&
      this.validateForm.mobileFormat
  }
}
