import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocManagVersionTrdCreateComponent } from './doc-manag-version-trd-create.component';

describe('DocManagVersionTrdCreateComponent', () => {
  let component: DocManagVersionTrdCreateComponent;
  let fixture: ComponentFixture<DocManagVersionTrdCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocManagVersionTrdCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocManagVersionTrdCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
