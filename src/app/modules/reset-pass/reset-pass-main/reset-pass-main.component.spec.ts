/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPassMainComponent } from './reset-pass-main.component';

describe('ResetPassMainComponent', () => {
  let component: ResetPassMainComponent;
  let fixture: ComponentFixture<ResetPassMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetPassMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPassMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
