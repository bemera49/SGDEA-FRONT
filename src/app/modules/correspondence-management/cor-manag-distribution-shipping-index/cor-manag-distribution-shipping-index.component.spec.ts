/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorManagDistributionShippingIndexComponent } from './cor-manag-distribution-shipping-index.component';

describe('CorManagDistributionShippingIndexComponent', () => {
  let component: CorManagDistributionShippingIndexComponent;
  let fixture: ComponentFixture<CorManagDistributionShippingIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorManagDistributionShippingIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorManagDistributionShippingIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
