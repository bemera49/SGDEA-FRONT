/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilingUpdateComponent } from './filing-update.component';

describe('FilingUpdateComponent', () => {
  let component: FilingUpdateComponent;
  let fixture: ComponentFixture<FilingUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilingUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilingUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
