import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastQualityComponent } from './toast-quality.component';

describe('ToastQualityComponent', () => {
  let component: ToastQualityComponent;
  let fixture: ComponentFixture<ToastQualityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastQualityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ToastQualityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
