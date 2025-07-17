import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcupationalRequestIndexComponent } from './ocupational-request-index.component';

describe('OcupationalRequestIndexComponent', () => {
  let component: OcupationalRequestIndexComponent;
  let fixture: ComponentFixture<OcupationalRequestIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OcupationalRequestIndexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OcupationalRequestIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
