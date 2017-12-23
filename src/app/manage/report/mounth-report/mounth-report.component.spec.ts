import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MounthReportComponent } from './mounth-report.component';

describe('MounthReportComponent', () => {
  let component: MounthReportComponent;
  let fixture: ComponentFixture<MounthReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MounthReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MounthReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
