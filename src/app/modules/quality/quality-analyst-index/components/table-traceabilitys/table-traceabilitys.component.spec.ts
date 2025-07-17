import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTraceabilitysComponent } from './table-traceabilitys.component';

describe('TableTraceabilitysComponent', () => {
  let component: TableTraceabilitysComponent;
  let fixture: ComponentFixture<TableTraceabilitysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableTraceabilitysComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableTraceabilitysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
