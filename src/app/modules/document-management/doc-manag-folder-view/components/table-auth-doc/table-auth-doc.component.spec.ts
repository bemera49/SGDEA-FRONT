import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableAuthDocComponent } from './table-auth-doc.component';

describe('TableAuthDocComponent', () => {
  let component: TableAuthDocComponent;
  let fixture: ComponentFixture<TableAuthDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableAuthDocComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableAuthDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
