import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocInventoryComponent } from './doc-inventory.component';

describe('DocInventoryComponent', () => {
  let component: DocInventoryComponent;
  let fixture: ComponentFixture<DocInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocInventoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
