/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnlockMainComponent } from './unlock-main.component';

describe('UnlockMainComponent', () => {
  let component: UnlockMainComponent;
  let fixture: ComponentFixture<UnlockMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnlockMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnlockMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
