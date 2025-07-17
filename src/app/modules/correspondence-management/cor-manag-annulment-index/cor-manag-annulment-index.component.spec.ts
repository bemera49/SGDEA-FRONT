/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorManagAnnulmentIndexComponent } from './cor-manag-annulment-index.component';

describe('CorManagAnnulmentIndexComponent', () => {
  let component: CorManagAnnulmentIndexComponent;
  let fixture: ComponentFixture<CorManagAnnulmentIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorManagAnnulmentIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorManagAnnulmentIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
