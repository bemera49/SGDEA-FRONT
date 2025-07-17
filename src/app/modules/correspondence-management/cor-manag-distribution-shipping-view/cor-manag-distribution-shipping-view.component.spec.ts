/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorManagDistributionShippingViewComponent } from './cor-manag-distribution-shipping-view.component';

describe('CorManagDistributionShippingViewComponent', () => {
  let component: CorManagDistributionShippingViewComponent;
  let fixture: ComponentFixture<CorManagDistributionShippingViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorManagDistributionShippingViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorManagDistributionShippingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
