/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleTextModalComponent } from './simple-text-modal.component';

describe('SimpleTextModalComponent', () => {
  let component: SimpleTextModalComponent;
  let fixture: ComponentFixture<SimpleTextModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleTextModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleTextModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
