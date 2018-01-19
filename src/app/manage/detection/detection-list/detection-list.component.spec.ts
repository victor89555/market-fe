import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetectionListComponent } from './detection-list.component';

describe('DetectionListComponent', () => {
  let component: DetectionListComponent;
  let fixture: ComponentFixture<DetectionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetectionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
