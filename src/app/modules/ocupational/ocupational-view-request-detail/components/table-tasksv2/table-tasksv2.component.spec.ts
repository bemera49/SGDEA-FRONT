import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTasksv2Component } from './table-tasksv2.component';

describe('TableTasksv2Component', () => {
  let component: TableTasksv2Component;
  let fixture: ComponentFixture<TableTasksv2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableTasksv2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableTasksv2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
