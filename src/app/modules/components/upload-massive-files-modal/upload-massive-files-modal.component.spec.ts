/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadMassiveFilesModalComponent } from './upload-massive-files-modal.component';

describe('UploadMassiveFilesModalComponent', () => {
  let component: UploadMassiveFilesModalComponent;
  let fixture: ComponentFixture<UploadMassiveFilesModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadMassiveFilesModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadMassiveFilesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
