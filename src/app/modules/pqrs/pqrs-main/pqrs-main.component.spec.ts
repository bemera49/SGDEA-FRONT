/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PqrsMainComponent } from './pqrs-main.component';

describe('PqrsMainComponent', () => {
  let component: PqrsMainComponent;
  let fixture: ComponentFixture<PqrsMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PqrsMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PqrsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
