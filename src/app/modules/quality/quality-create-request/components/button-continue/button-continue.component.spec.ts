import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonContinueComponent } from './button-continue.component';

describe('ButtonContinueComponent', () => {
  let component: ButtonContinueComponent;
  let fixture: ComponentFixture<ButtonContinueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonContinueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonContinueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
