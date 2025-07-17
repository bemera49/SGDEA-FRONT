import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProrrogaComponent } from './view-prorroga.component';

describe('ViewProrrogaComponent', () => {
  let component: ViewProrrogaComponent;
  let fixture: ComponentFixture<ViewProrrogaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewProrrogaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewProrrogaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
