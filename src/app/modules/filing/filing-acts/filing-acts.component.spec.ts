import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilingActsComponent } from './filing-acts.component';

describe('FilingActsComponent', () => {
  let component: FilingActsComponent;
  let fixture: ComponentFixture<FilingActsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilingActsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilingActsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
