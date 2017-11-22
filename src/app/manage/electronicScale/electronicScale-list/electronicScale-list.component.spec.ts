import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {ElectronicScaleListComponent} from "./electronicScale-list.component";

describe('ElectronicScaleListComponent', () => {
  let component: ElectronicScaleListComponent;
  let fixture: ComponentFixture<ElectronicScaleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElectronicScaleListComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectronicScaleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
