import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReasignarAnalistaComponent } from './reasignar-analista.component';

describe('ReasignarAnalistaComponent', () => {
  let component: ReasignarAnalistaComponent;
  let fixture: ComponentFixture<ReasignarAnalistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ReasignarAnalistaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReasignarAnalistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
