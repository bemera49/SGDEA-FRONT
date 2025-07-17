import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignatureHomeComponent } from './signature-home.component';

describe('SignatureHomeComponent', () => {
  let component: SignatureHomeComponent;
  let fixture: ComponentFixture<SignatureHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignatureHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignatureHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
