import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTasksClosedComponent } from './table-tasks-closed.component';

describe('TableTasksClosedComponent', () => {
  let component: TableTasksClosedComponent;
  let fixture: ComponentFixture<TableTasksClosedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableTasksClosedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableTasksClosedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
