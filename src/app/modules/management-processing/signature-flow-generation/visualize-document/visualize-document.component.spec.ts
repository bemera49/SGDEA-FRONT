import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizeDocumentComponent } from './visualize-document.component';

describe('VisualizeDocumentComponent', () => {
  let component: VisualizeDocumentComponent;
  let fixture: ComponentFixture<VisualizeDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizeDocumentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizeDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
