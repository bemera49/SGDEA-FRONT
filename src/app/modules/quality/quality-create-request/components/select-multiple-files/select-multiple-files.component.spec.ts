import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectMultipleFilesComponent } from './select-multiple-files.component';

describe('SelectMultipleFilesComponent', () => {
  let component: SelectMultipleFilesComponent;
  let fixture: ComponentFixture<SelectMultipleFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectMultipleFilesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectMultipleFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
