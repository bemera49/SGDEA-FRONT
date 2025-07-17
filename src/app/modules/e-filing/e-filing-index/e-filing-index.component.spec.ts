import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EFilingIndexComponent } from './e-filing-index.component';

describe('EFilingIndexComponent', () => {
  let component: EFilingIndexComponent;
  let fixture: ComponentFixture<EFilingIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EFilingIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EFilingIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
