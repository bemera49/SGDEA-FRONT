import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaRelatoriaComponent } from './ficha-relatoria.component';

describe('FichaRelatoriaComponent', () => {
  let component: FichaRelatoriaComponent;
  let fixture: ComponentFixture<FichaRelatoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FichaRelatoriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichaRelatoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
