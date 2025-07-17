import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SgdaEditorComponent } from './sgda-editor.component';

describe('SgdaEditorComponent', () => {
  let component: SgdaEditorComponent;
  let fixture: ComponentFixture<SgdaEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SgdaEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SgdaEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
