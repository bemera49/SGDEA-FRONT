import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDependencyComponent } from './table-dependency.component';

describe('TableDependencyComponent', () => {
  let component: TableDependencyComponent;
  let fixture: ComponentFixture<TableDependencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableDependencyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableDependencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
