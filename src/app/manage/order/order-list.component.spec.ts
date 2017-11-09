import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InlineComponent } from './order-list.component';

describe('OrderMockComponent', () => {
  let component: InlineComponent;
  let fixture: ComponentFixture<InlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InlineComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
