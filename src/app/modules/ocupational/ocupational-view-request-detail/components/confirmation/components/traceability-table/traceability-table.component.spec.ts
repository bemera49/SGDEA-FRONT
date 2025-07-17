import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraceabilityTableComponent } from './traceability-table.component';

describe('TraceabilityTableComponent', () => {
  let component: TraceabilityTableComponent;
  let fixture: ComponentFixture<TraceabilityTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TraceabilityTableComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TraceabilityTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
