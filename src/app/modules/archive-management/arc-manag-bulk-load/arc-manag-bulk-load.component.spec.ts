import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArcManagBulkLoadComponent } from './arc-manag-bulk-load.component';

describe('ArcManagUploadMassiveComponent', () => {
  let component: ArcManagBulkLoadComponent;
  let fixture: ComponentFixture<ArcManagBulkLoadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArcManagBulkLoadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArcManagBulkLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
