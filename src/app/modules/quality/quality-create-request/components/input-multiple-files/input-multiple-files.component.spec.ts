import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputMultipleFilesComponent } from './input-multiple-files.component';

describe('InputMultipleFilesComponent', () => {
  let component: InputMultipleFilesComponent;
  let fixture: ComponentFixture<InputMultipleFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputMultipleFilesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputMultipleFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
