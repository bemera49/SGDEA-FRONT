import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDAComponent } from './table-da.component';

describe('TableDAComponent', () => {
  let component: TableDAComponent;
  let fixture: ComponentFixture<TableDAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableDAComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableDAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
