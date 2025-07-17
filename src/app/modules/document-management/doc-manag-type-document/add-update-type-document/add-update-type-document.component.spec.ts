import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateTypeDocumentComponent } from './add-update-type-document.component';

describe('AddUpdateTypeDocumentComponent', () => {
  let component: AddUpdateTypeDocumentComponent;
  let fixture: ComponentFixture<AddUpdateTypeDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateTypeDocumentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUpdateTypeDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
