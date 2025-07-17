import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraggableTableCopyComponent } from './draggable-table-copy.component';

describe('DraggableTableCopyComponent', () => {
  let component: DraggableTableCopyComponent;
  let fixture: ComponentFixture<DraggableTableCopyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DraggableTableCopyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DraggableTableCopyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
