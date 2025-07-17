import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilingRadicadosEmailIndexComponent } from './filing-radicados-email-index.component';

describe('FilingRadicadosEmailIndexComponent', () => {
  let component: FilingRadicadosEmailIndexComponent;
  let fixture: ComponentFixture<FilingRadicadosEmailIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilingRadicadosEmailIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilingRadicadosEmailIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
