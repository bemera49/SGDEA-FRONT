import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PucCuentasViewComponent } from './puc-cuentas-view.component';

describe('PucCuentasViewComponent', () => {
  let component: PucCuentasViewComponent;
  let fixture: ComponentFixture<PucCuentasViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PucCuentasViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PucCuentasViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
