/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendReplyMailComponent } from './send-reply-mail-dialog.component';

describe('SendReplyMailComponent', () => {
  let component: SendReplyMailComponent;
  let fixture: ComponentFixture<SendReplyMailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendReplyMailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendReplyMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
