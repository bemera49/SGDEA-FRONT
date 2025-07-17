import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowForeignUserViewModalComponent } from './flow-foreign-user-view-modal.component';

describe('FlowForeignUserViewModalComponent', () => {
  let component: FlowForeignUserViewModalComponent;
  let fixture: ComponentFixture<FlowForeignUserViewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlowForeignUserViewModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlowForeignUserViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
