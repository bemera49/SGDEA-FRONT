import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDependencyDocComponent } from './modal-dependency-doc.component';

describe('ModalDependencyDocComponent', () => {
  let component: ModalDependencyDocComponent;
  let fixture: ComponentFixture<ModalDependencyDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalDependencyDocComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalDependencyDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
