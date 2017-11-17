import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {OrderMarketsComponent} from "./market-list.component";

describe('OrderMockComponent', () => {
  let component: OrderMarketsComponent;
  let fixture: ComponentFixture<OrderMarketsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderMarketsComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderMarketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
