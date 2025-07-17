/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadMassiveFilesDetailModalComponent } from './upload-massive-files-detail-modal.component';

describe('UploadMassiveFilesDetailModalComponent', () => {
  let component: UploadMassiveFilesDetailModalComponent;
  let fixture: ComponentFixture<UploadMassiveFilesDetailModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadMassiveFilesDetailModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadMassiveFilesDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
