/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsCustomComponent } from './reports-custom.component';

describe('ReportsCustomComponent', () => {
  let component: ReportsCustomComponent;
  let fixture: ComponentFixture<ReportsCustomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsCustomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
