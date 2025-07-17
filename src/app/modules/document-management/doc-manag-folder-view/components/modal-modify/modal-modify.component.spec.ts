import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalModifyComponent } from './modal-modify.component';

describe('ModalModifyComponent', () => {
  let component: ModalModifyComponent;
  let fixture: ComponentFixture<ModalModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalModifyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
