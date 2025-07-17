import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableARItemsComponent } from './table-ar-items.component';

describe('TableARItemsComponent', () => {
  let component: TableARItemsComponent;
  let fixture: ComponentFixture<TableARItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableARItemsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableARItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
