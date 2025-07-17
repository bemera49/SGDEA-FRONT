import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFileExpComponent } from './dialog-file-exp.component';

describe('DialogFileExpComponent', () => {
  let component: DialogFileExpComponent;
  let fixture: ComponentFixture<DialogFileExpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogFileExpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogFileExpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
