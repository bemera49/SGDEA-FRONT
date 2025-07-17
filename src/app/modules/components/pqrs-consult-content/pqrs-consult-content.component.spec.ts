import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PqrsConsultContentComponent } from './pqrs-consult-content.component';

describe('PqrsConsultContentComponent', () => {
  let component: PqrsConsultContentComponent;
  let fixture: ComponentFixture<PqrsConsultContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PqrsConsultContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PqrsConsultContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
