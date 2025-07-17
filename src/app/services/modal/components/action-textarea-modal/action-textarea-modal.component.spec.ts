import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionTextareaModalComponent } from './action-textarea-modal.component';

describe('ActionTextareaModalComponent', () => {
  let component: ActionTextareaModalComponent;
  let fixture: ComponentFixture<ActionTextareaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ActionTextareaModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionTextareaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
