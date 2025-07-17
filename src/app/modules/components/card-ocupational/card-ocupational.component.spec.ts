import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardOcupationalComponent } from './card-ocupational.component';

describe('CardOcupationalComponent', () => {
  let component: CardOcupationalComponent;
  let fixture: ComponentFixture<CardOcupationalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardOcupationalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardOcupationalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
