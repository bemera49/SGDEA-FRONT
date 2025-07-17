import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PantallaBComponent } from './pantalla-b.component';

describe('PantallaBComponent', () => {
  let component: PantallaBComponent;
  let fixture: ComponentFixture<PantallaBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PantallaBComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PantallaBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
