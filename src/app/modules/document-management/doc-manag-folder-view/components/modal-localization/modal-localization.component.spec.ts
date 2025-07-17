import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLocalizationComponent } from './modal-localization.component';

describe('ModalLocalizationComponent', () => {
  let component: ModalLocalizationComponent;
  let fixture: ComponentFixture<ModalLocalizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalLocalizationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalLocalizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
