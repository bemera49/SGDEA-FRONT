import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeRequestComponent } from './type-request.component';

describe('TypeRequestComponent', () => {
  let component: TypeRequestComponent;
  let fixture: ComponentFixture<TypeRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
