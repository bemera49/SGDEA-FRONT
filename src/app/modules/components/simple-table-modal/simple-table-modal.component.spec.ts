/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleTableModalComponent } from './simple-table-modal.component';

describe('SimpleTableModalComponent', () => {
  let component: SimpleTableModalComponent;
  let fixture: ComponentFixture<SimpleTableModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleTableModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleTableModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
