/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedIndexComponent } from './advanced-index.component';

describe('AdvancedIndexComponent', () => {
  let component: AdvancedIndexComponent;
  let fixture: ComponentFixture<AdvancedIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvancedIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvancedIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
