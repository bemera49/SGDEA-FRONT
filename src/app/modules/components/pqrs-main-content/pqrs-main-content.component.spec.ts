import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PqrsMainContentComponent } from './pqrs-main-content.component';

describe('PqrsMainContentComponent', () => {
  let component: PqrsMainContentComponent;
  let fixture: ComponentFixture<PqrsMainContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PqrsMainContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PqrsMainContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
