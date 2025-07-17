/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QrviewMainComponent } from './qrview-main.component';

describe('QrviewMainComponent', () => {
  let component: QrviewMainComponent;
  let fixture: ComponentFixture<QrviewMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrviewMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QrviewMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
