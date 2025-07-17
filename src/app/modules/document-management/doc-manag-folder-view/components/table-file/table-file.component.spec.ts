import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableFileComponent } from './table-file.component';

describe('TableFileComponent', () => {
  let component: TableFileComponent;
  let fixture: ComponentFixture<TableFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableFileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
