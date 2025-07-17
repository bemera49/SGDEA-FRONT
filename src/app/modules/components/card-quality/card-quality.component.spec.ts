import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardQualityComponent } from './card-quality.component';

describe('CardQualityComponent', () => {
  let component: CardQualityComponent;
  let fixture: ComponentFixture<CardQualityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardQualityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardQualityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
