import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputsViewRequestComponent } from './inputs-view-request.component';

describe('InputsViewRequestComponent', () => {
  let component: InputsViewRequestComponent;
  let fixture: ComponentFixture<InputsViewRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputsViewRequestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputsViewRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
