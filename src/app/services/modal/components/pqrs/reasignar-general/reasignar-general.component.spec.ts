import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReasignarGeneralComponent } from './reasignar-general.component';

describe('ReasignarGeneralComponent', () => {
  let component: ReasignarGeneralComponent;
  let fixture: ComponentFixture<ReasignarGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ReasignarGeneralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReasignarGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
