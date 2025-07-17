import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredialMainComponent } from './predial-main.component';

describe('PredialMainComponent', () => {
  let component: PredialMainComponent;
  let fixture: ComponentFixture<PredialMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PredialMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PredialMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
