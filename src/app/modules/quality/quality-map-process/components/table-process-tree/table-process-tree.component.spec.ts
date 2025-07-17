import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableProcessTreeComponent } from './table-process-tree.component';

describe('TableProcessTreeComponent', () => {
  let component: TableProcessTreeComponent;
  let fixture: ComponentFixture<TableProcessTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableProcessTreeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableProcessTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
