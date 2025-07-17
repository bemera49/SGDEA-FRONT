import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableStyle2Component } from './table-style2.component';

describe('TableStyle2Component', () => {
  let component: TableStyle2Component;
  let fixture: ComponentFixture<TableStyle2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableStyle2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableStyle2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
