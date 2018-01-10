import {Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, Renderer2} from '@angular/core';
import {Area} from "./area.mode"
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms"
import {AREA_DATA} from "./area.data"

@Component({
  selector: 'tg-area-select',
  templateUrl: './area-select.component.html',
  styleUrls: ['./area-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AreaSelectComponent),
      multi: true
    }
  ]
})
export class AreaSelectComponent implements OnInit, ControlValueAccessor {

  constructor(private elementRef: ElementRef,
              private renderer: Renderer2) {
  }

  areaData = AREA_DATA
  provinces = []
  cities = []
  @Input() area: Area = new Area({ "code": null, "region": null }, { "code": null, "region": null })
  private onChange = (_: any) => null
  private onTouched = () => null
  @Output() proviceChange = new EventEmitter<any>();
  @Output() cityChange = new EventEmitter<any>();

  ngOnInit() {
    this.getProvinces()
  }

  getProvinces() {
    for (let i = 0; i < this.areaData.provinces.length; i++) {
      this.provinces.push({code:this.areaData.provinces[i].code,region:this.areaData.provinces[i].region})
    }
  }

  getCities() {
    for (let i = 0; i < this.areaData.provinces.length; i++) {
      if (this.areaData.provinces[i].code == this.area.provinceCode.code) {
        this.cities = this.areaData.provinces[i].regionEntitys
      }
    }
  }

  selectedProvinceChange() {
    this.getCities()
    this.onChange(this.area)
    this.proviceChange.emit(this.area.provinceCode)
  }

  selectedCityChange() {
    this.onChange(this.area)
    this.cityChange.emit(this.area.cityCode)
  }

  writeValue(value: any): void {
    if (value !== undefined && value != null) {
      this.area = value
      if (this.area.provinceCode) {
        this.getCities()
      }
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.renderer.setProperty(this.elementRef.nativeElement, 'disabled', isDisabled);
  }
}
