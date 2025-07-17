import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralInformationFillComponent } from './general-information-fill.component';

describe('GeneralInformationFillComponent', () => {
  let component: GeneralInformationFillComponent;
  let fixture: ComponentFixture<GeneralInformationFillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralInformationFillComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralInformationFillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
