/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingAuthComponent } from './loading-auth.component';

describe('LoadingAuthComponent', () => {
  let component: LoadingAuthComponent;
  let fixture: ComponentFixture<LoadingAuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingAuthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
