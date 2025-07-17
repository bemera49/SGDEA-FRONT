import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementProcessingMainComponent } from './management-processing-main.component';

describe('ManagementProcessingMainComponent', () => {
  let component: ManagementProcessingMainComponent;
  let fixture: ComponentFixture<ManagementProcessingMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagementProcessingMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagementProcessingMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
