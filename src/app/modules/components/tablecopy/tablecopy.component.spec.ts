import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablecopyComponent } from './tablecopy.component';

describe('TablecopyComponent', () => {
  let component: TablecopyComponent;
  let fixture: ComponentFixture<TablecopyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablecopyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablecopyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
