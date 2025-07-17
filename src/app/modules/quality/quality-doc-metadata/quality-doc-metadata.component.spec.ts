import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityDocMetadataComponent } from './quality-doc-metadata.component';

describe('QualityDocMetadataComponent', () => {
  let component: QualityDocMetadataComponent;
  let fixture: ComponentFixture<QualityDocMetadataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QualityDocMetadataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QualityDocMetadataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
