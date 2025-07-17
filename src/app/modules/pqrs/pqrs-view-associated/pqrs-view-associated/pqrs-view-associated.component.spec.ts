import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PqrsViewAssociatedComponent } from './pqrs-view-associated.component';

describe('PqrsViewAssociatedComponent', () => {
  let component: PqrsViewAssociatedComponent;
  let fixture: ComponentFixture<PqrsViewAssociatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PqrsViewAssociatedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PqrsViewAssociatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
