import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDependencyComponent } from './modal-dependency.component';

describe('ModalDependencyComponent', () => {
  let component: ModalDependencyComponent;
  let fixture: ComponentFixture<ModalDependencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalDependencyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalDependencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
