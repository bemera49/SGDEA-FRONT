import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredialCreateRequestComponent } from './predial-create-request.component';

describe('PredialCreateRequestComponent', () => {
  let component: PredialCreateRequestComponent;
  let fixture: ComponentFixture<PredialCreateRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PredialCreateRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PredialCreateRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
