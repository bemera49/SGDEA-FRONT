/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPdfModalComponent } from './view-pdf-modal.component';

describe('ViewPdfModalComponent', () => {
  let component: ViewPdfModalComponent;
  let fixture: ComponentFixture<ViewPdfModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPdfModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPdfModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
