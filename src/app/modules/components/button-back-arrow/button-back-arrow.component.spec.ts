import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonBackArrowComponent } from './button-back-arrow.component';

describe('ButtonBackArrowComponent', () => {
  let component: ButtonBackArrowComponent;
  let fixture: ComponentFixture<ButtonBackArrowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonBackArrowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonBackArrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
