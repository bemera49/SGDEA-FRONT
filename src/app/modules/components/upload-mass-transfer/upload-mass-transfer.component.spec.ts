import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadMassTransferComponent } from './upload-mass-transfer.component';

describe('UploadMassTransferComponent', () => {
  let component: UploadMassTransferComponent;
  let fixture: ComponentFixture<UploadMassTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadMassTransferComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UploadMassTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
