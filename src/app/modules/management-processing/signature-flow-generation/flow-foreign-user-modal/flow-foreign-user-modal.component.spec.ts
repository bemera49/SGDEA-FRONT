import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowForeignUserModalComponent } from './flow-foreign-user-modal.component';

describe('FlowForeignUserModalComponent', () => {
  let component: FlowForeignUserModalComponent;
  let fixture: ComponentFixture<FlowForeignUserModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlowForeignUserModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlowForeignUserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
