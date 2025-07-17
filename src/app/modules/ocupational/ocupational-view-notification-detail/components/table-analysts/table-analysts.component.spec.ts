import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableAnalystsComponent } from './table-analysts.component';

describe('TableAnalystsComponent', () => {
  let component: TableAnalystsComponent;
  let fixture: ComponentFixture<TableAnalystsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableAnalystsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableAnalystsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
