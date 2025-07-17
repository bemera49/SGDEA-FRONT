import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignatureInternalSignComponent } from './signature-internal-sign.component';

describe('SignatureInternalSignComponent', () => {
  let component: SignatureInternalSignComponent;
  let fixture: ComponentFixture<SignatureInternalSignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignatureInternalSignComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignatureInternalSignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
