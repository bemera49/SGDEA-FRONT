import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlternateViewTwoComponent } from './alternate-view-two.component';

describe('AlternateViewTwoComponent', () => {
  let component: AlternateViewTwoComponent;
  let fixture: ComponentFixture<AlternateViewTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlternateViewTwoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlternateViewTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
