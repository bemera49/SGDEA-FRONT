import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestExtensionComponent } from './request-extension.component';

describe('RequestExtensionComponent', () => {
  let component: RequestExtensionComponent;
  let fixture: ComponentFixture<RequestExtensionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestExtensionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestExtensionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
