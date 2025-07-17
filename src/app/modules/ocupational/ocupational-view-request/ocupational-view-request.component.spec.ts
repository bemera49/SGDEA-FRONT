import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcupationalViewRequestComponent } from './ocupational-view-request.component';

describe('OcupationalViewRequestComponent', () => {
  let component: OcupationalViewRequestComponent;
  let fixture: ComponentFixture<OcupationalViewRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OcupationalViewRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OcupationalViewRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
