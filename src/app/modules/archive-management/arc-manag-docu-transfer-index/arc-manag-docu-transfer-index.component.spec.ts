/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArcManagDocuTransferIndexComponent } from './arc-manag-docu-transfer-index.component';

describe('ArcManagDocuTransferIndexComponent', () => {
  let component: ArcManagDocuTransferIndexComponent;
  let fixture: ComponentFixture<ArcManagDocuTransferIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArcManagDocuTransferIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArcManagDocuTransferIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
