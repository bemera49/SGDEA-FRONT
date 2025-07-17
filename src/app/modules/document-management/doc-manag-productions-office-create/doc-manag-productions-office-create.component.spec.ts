import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocManagProductionsOfficeCreateComponent } from './doc-manag-productions-office-create.component';

describe('DocManagProductionsOfficeCreateComponent', () => {
  let component: DocManagProductionsOfficeCreateComponent;
  let fixture: ComponentFixture<DocManagProductionsOfficeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocManagProductionsOfficeCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocManagProductionsOfficeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
