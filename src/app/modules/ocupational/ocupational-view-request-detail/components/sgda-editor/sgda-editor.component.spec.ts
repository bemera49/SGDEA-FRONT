import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SgdaEditorV2Component } from './sgda-editor.component';

describe('SgdaEditorV2Component', () => {
  let component: SgdaEditorV2Component;
  let fixture: ComponentFixture<SgdaEditorV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SgdaEditorV2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SgdaEditorV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
