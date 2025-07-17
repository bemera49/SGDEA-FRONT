/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncludeInFileComponent } from './include-in-file.component';

describe('IncludeInFileComponent', () => {
  let component: IncludeInFileComponent;
  let fixture: ComponentFixture<IncludeInFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncludeInFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncludeInFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
