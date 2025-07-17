import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CooperativeEditModalComponent } from './cooperative-edit-modal.component';

describe('CooperativeEditModalComponent', () => {
  let component: CooperativeEditModalComponent;
  let fixture: ComponentFixture<CooperativeEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CooperativeEditModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CooperativeEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
