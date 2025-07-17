import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityDownloadTemplateComponent } from './quality-download-template.component';

describe('QualityDownloadTemplateComponent', () => {
  let component: QualityDownloadTemplateComponent;
  let fixture: ComponentFixture<QualityDownloadTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QualityDownloadTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QualityDownloadTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
