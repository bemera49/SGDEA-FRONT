import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocManagProductionsOfficeIndexComponent } from './doc-manag-productions-office-index.component';

describe('DocManagProductionsOfficeIndexComponent', () => {
  let component: DocManagProductionsOfficeIndexComponent;
  let fixture: ComponentFixture<DocManagProductionsOfficeIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocManagProductionsOfficeIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocManagProductionsOfficeIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
