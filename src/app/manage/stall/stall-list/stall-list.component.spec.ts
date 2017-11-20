import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {StallListComponent} from "./stall-list.component";

describe('StallListComponent', () => {
  let component: StallListComponent;
  let fixture: ComponentFixture<StallListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StallListComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StallListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
