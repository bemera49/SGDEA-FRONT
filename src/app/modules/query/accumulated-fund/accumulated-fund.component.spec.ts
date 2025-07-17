/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccumulatedFundComponent } from './accumulated-fund.component';

describe('AccumulatedFundComponent', () => {
  let component: AccumulatedFundComponent;
  let fixture: ComponentFixture<AccumulatedFundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccumulatedFundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccumulatedFundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
