import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDependencyDocComponent } from './table-dependency-doc.component';

describe('TableDependencyDocComponent', () => {
  let component: TableDependencyDocComponent;
  let fixture: ComponentFixture<TableDependencyDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableDependencyDocComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableDependencyDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
