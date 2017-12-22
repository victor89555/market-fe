import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectronicScaleHistoryComponent } from './electronic-scale-history.component';

describe('ElectronicScaleHistoryComponent', () => {
  let component: ElectronicScaleHistoryComponent;
  let fixture: ComponentFixture<ElectronicScaleHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElectronicScaleHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectronicScaleHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
