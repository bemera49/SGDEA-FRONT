import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcupationalResetIndexComponent } from './ocupational-reset-index.component';

describe('OcupationalResetIndexComponent', () => {
  let component: OcupationalResetIndexComponent;
  let fixture: ComponentFixture<OcupationalResetIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OcupationalResetIndexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OcupationalResetIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
