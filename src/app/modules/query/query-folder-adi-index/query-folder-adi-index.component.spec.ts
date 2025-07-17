/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryFolderAdiIndexComponent } from './query-folder-adi-index.component';

describe('QueryFolderAdiIndexComponent', () => {
  let component: QueryFolderAdiIndexComponent;
  let fixture: ComponentFixture<QueryFolderAdiIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryFolderAdiIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryFolderAdiIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
