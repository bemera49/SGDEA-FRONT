import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSelectDocComponent } from './modal-select-doc.component';

describe('ModalSelectDocComponent', () => {
  let component: ModalSelectDocComponent;
  let fixture: ComponentFixture<ModalSelectDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalSelectDocComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalSelectDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
