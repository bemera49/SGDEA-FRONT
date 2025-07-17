import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcupationalViewRequestDetailComponent } from './ocupational-view-request-detail.component';

describe('OcupationalViewRequestDetailComponent', () => {
  let component: OcupationalViewRequestDetailComponent;
  let fixture: ComponentFixture<OcupationalViewRequestDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OcupationalViewRequestDetailComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(OcupationalViewRequestDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
