import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreacionContactosComponent } from './creacion-contactos.component';

describe('CreacionContactosComponent', () => {
  let component: CreacionContactosComponent;
  let fixture: ComponentFixture<CreacionContactosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreacionContactosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreacionContactosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
