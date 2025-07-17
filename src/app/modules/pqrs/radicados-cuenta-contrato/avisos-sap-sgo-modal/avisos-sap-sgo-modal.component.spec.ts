import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisosSapSgoModalComponent } from './avisos-sap-sgo-modal.component';

describe('AvisosSapSgoModalComponent', () => {
  let component: AvisosSapSgoModalComponent;
  let fixture: ComponentFixture<AvisosSapSgoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvisosSapSgoModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvisosSapSgoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
