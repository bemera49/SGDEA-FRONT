import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlternateViewOneComponent } from './alternate-view-one.component';

describe('AlternateViewOneComponent', () => {
  let component: AlternateViewOneComponent;
  let fixture: ComponentFixture<AlternateViewOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlternateViewOneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlternateViewOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
