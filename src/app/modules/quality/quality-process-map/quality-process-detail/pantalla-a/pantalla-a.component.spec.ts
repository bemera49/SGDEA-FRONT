import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PantallaAComponent } from './pantalla-a.component';

describe('PantallaAComponent', () => {
  let component: PantallaAComponent;
  let fixture: ComponentFixture<PantallaAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PantallaAComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PantallaAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
