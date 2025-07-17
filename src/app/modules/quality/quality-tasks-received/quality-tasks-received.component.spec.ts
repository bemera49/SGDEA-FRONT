import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityTasksReceivedComponent } from './quality-tasks-received.component';

describe('QualityTasksReceivedComponent', () => {
  let component: QualityTasksReceivedComponent;
  let fixture: ComponentFixture<QualityTasksReceivedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QualityTasksReceivedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QualityTasksReceivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
