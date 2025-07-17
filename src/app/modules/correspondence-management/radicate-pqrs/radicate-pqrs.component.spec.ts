import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadicatePqrsComponent } from './radicate-pqrs.component';

describe('RadicatePqrsComponent', () => {
  let component: RadicatePqrsComponent;
  let fixture: ComponentFixture<RadicatePqrsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadicatePqrsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadicatePqrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
