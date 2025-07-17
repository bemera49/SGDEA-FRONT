/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetTokenPassMainComponent } from './reset-token-pass-main.component';

describe('ResetTokenPassMainComponent', () => {
  let component: ResetTokenPassMainComponent;
  let fixture: ComponentFixture<ResetTokenPassMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetTokenPassMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetTokenPassMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
