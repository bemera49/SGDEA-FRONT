/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadFilesQuestionComponent } from './upload-files-question.component';

describe('UploadFilesQuestionComponent', () => {
  let component: UploadFilesQuestionComponent;
  let fixture: ComponentFixture<UploadFilesQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadFilesQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadFilesQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
