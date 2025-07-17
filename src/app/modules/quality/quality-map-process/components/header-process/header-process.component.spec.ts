import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderProcessComponent } from './header-process.component';

describe('HeaderProcessComponent', () => {
  let component: HeaderProcessComponent;
  let fixture: ComponentFixture<HeaderProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderProcessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
