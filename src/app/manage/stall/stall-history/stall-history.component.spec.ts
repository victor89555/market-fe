import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StallHistoryComponent } from './stall-history.component';

describe('StallHistoryComponent', () => {
  let component: StallHistoryComponent;
  let fixture: ComponentFixture<StallHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StallHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StallHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
