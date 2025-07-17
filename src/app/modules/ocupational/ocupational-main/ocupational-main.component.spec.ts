import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcupationalMainComponent } from './ocupational-main.component';

describe('OcupationalMainComponent', () => {
  let component: OcupationalMainComponent;
  let fixture: ComponentFixture<OcupationalMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OcupationalMainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OcupationalMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
