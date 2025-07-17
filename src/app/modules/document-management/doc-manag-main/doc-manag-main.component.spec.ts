/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocManagMainComponent } from './doc-manag-main.component';

describe('DocManagMainComponent', () => {
  let component: DocManagMainComponent;
  let fixture: ComponentFixture<DocManagMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocManagMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocManagMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
