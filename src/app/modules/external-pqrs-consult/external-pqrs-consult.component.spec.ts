import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalPqrsConsultComponent } from './external-pqrs-consult.component';

describe('ExternalPqrsConsultComponent', () => {
  let component: ExternalPqrsConsultComponent;
  let fixture: ComponentFixture<ExternalPqrsConsultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExternalPqrsConsultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExternalPqrsConsultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
