import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignatureFlowGenerationComponent } from './signature-flow-generation.component';

describe('SignatureFlowGenerationComponent', () => {
  let component: SignatureFlowGenerationComponent;
  let fixture: ComponentFixture<SignatureFlowGenerationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignatureFlowGenerationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignatureFlowGenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
