import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalACComponent } from './modal-ac.component';

describe('ModalACComponent', () => {
  let component: ModalACComponent;
  let fixture: ComponentFixture<ModalACComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalACComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalACComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
