import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateSecurityComponent } from './template-security.component';

describe('TemplateSecurityComponent', () => {
  let component: TemplateSecurityComponent;
  let fixture: ComponentFixture<TemplateSecurityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateSecurityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplateSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
