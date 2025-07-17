import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilingRequestDistributionIndexComponent } from './filing-request-distribution-index.component';

describe('FilingRequestDistributionIndexComponent', () => {
  let component: FilingRequestDistributionIndexComponent;
  let fixture: ComponentFixture<FilingRequestDistributionIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilingRequestDistributionIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilingRequestDistributionIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
