import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketStatisticsComponent } from './market-statistics.component';

describe('MarketStatisticsComponent', () => {
  let component: MarketStatisticsComponent;
  let fixture: ComponentFixture<MarketStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
