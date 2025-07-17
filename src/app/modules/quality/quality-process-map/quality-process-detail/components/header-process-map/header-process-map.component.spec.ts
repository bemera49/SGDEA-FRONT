import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderProcessMapComponent } from './header-process-map.component';

describe('HeaderProcessMapComponent', () => {
  let component: HeaderProcessMapComponent;
  let fixture: ComponentFixture<HeaderProcessMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderProcessMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderProcessMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
