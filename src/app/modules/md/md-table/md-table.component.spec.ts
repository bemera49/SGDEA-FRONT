/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MdTableComponent } from './md-table.component';

describe('MdTableComponent', () => {
  let component: MdTableComponent;
  let fixture: ComponentFixture<MdTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MdTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MdTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
