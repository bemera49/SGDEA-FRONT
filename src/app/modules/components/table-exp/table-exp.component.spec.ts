import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableExpComponent } from './table-exp.component';

describe('TableExpComponent', () => {
  let component: TableExpComponent;
  let fixture: ComponentFixture<TableExpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableExpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableExpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
