import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArcManagMassTransferComponent } from './arc-manag-mass-transfer.component';

describe('ArcManagUploadMassiveComponent', () => {
  let component: ArcManagMassTransferComponent;
  let fixture: ComponentFixture<ArcManagMassTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArcManagMassTransferComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArcManagMassTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
