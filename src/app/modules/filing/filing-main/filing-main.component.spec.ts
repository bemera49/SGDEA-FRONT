/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilingMainComponent } from './filing-main.component';

describe('FilingMainComponent', () => {
  let component: FilingMainComponent;
  let fixture: ComponentFixture<FilingMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilingMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilingMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
