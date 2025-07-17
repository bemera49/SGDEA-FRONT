import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableStyle3Component } from './table-style3.component';

describe('TableStyle3Component', () => {
  let component: TableStyle3Component;
  let fixture: ComponentFixture<TableStyle3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableStyle3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableStyle3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
