import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopStatisticsComponent } from './shop-statistics.component';

describe('ShopStatisticsComponent', () => {
  let component: ShopStatisticsComponent;
  let fixture: ComponentFixture<ShopStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
