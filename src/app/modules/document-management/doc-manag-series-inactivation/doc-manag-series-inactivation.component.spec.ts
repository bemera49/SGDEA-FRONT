import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocManagSeriesInactivationComponent } from './doc-manag-series-inactivation.component';

describe('DocManagSeriesInactivationComponent', () => {
  let component: DocManagSeriesInactivationComponent;
  let fixture: ComponentFixture<DocManagSeriesInactivationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocManagSeriesInactivationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocManagSeriesInactivationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
