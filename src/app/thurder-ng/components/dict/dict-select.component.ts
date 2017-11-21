import {Component, ElementRef, forwardRef, Input, OnInit, Renderer2} from "@angular/core";
import {dicts} from "../../models/dictionary"
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms"

@Component({
  selector: 'tg-dict-select',
  templateUrl: "./dict-select.component.html",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DictSelectComponent),
      multi: true
    }
  ]
})
export class DictSelectComponent implements OnInit, ControlValueAccessor {

  @Input() dictName: string
  private _selectedVal: any
  dictCodes: any[]

  private onChange = (_: any) => null;
  private onTouched = () => null;

  constructor(private elementRef: ElementRef,
              private renderer: Renderer2) {

  }

  ngOnInit(): void {
    if (!this.dictName) {
      throw new Error("请设置tg-dict-select的dictName属性")
    }
    this.dictCodes = dicts[this.dictName]
  }

  get selectedVal() {
    return this._selectedVal;
  }

  set selectedVal(val) {
    this._selectedVal = val;
    this.onChange(this._selectedVal);
  }

  writeValue(value: any): void {
    if (value !== undefined) {
      this.selectedVal = value
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

