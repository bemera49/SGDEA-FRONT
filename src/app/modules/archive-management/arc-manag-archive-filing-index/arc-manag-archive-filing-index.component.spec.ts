/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArcManagArchiveFilingIndexComponent } from './arc-manag-archive-filing-index.component';

describe('ArcManagArchiveFilingIndexComponent', () => {
  let component: ArcManagArchiveFilingIndexComponent;
  let fixture: ComponentFixture<ArcManagArchiveFilingIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArcManagArchiveFilingIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArcManagArchiveFilingIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
