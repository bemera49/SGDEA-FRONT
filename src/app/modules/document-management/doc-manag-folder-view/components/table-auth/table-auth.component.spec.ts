import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableAuthComponent } from './table-auth.component';

describe('TableAuthComponent', () => {
  let component: TableAuthComponent;
  let fixture: ComponentFixture<TableAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableAuthComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
