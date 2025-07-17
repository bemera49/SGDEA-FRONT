/**

 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginLicensingMessageComponent } from './login-licensing-message.component';

describe('LoginLicensingMessageComponent', () => {
  let component: LoginLicensingMessageComponent;
  let fixture: ComponentFixture<LoginLicensingMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginLicensingMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginLicensingMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
