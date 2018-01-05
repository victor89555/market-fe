import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UserAuthorizeComponent} from './user-authorize.component';

describe('UserAuthorizeComponent', () => {
  let component: UserAuthorizeComponent;
  let fixture: ComponentFixture<UserAuthorizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAuthorizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAuthorizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
