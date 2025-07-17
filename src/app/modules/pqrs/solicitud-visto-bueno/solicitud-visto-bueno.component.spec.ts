import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudVistoBuenoComponent } from './solicitud-visto-bueno.component';

describe('SolicitudVistoBuenoComponent', () => {
  let component: SolicitudVistoBuenoComponent;
  let fixture: ComponentFixture<SolicitudVistoBuenoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudVistoBuenoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitudVistoBuenoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
