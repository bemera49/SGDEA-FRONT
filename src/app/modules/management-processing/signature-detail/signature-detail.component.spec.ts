import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignatureDetailComponent } from './signature-detail.component';

describe('SignatureDetailComponent', () => {
  let component: SignatureDetailComponent;
  let fixture: ComponentFixture<SignatureDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SignatureDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignatureDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
