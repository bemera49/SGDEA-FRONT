import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CooperativeModalComponent } from './cooperative-modal.component';

describe('CooperativeModalComponent', () => {
  let component: CooperativeModalComponent;
  let fixture: ComponentFixture<CooperativeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CooperativeModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CooperativeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
