/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryFolderAdiViewComponent } from './query-folder-adi-view.component';

describe('QueryFolderAdiViewComponent', () => {
  let component: QueryFolderAdiViewComponent;
  let fixture: ComponentFixture<QueryFolderAdiViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryFolderAdiViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryFolderAdiViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
