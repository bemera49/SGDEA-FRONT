import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacacionesModalComponent } from './vacaciones-modal.component';

describe('VacacionesModalComponent', () => {
  let component: VacacionesModalComponent;
  let fixture: ComponentFixture<VacacionesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacacionesModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VacacionesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
