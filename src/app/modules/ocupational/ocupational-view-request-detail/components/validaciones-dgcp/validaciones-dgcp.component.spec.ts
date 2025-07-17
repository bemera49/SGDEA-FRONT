import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidacionesDGCPComponent } from './validaciones-dgcp.component';

describe('ValidacionesDGCPComponent', () => {
  let component: ValidacionesDGCPComponent;
  let fixture: ComponentFixture<ValidacionesDGCPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidacionesDGCPComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ValidacionesDGCPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
