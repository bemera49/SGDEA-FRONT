/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingAppComponent } from './loading-app.component';

describe('LoadingAppComponent', () => {
  let component: LoadingAppComponent;
  let fixture: ComponentFixture<LoadingAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
