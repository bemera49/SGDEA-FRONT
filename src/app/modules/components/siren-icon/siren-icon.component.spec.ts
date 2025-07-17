import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SirenIconComponent } from './siren-icon.component';

describe('SirenIconComponent', () => {
  let component: SirenIconComponent;
  let fixture: ComponentFixture<SirenIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SirenIconComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SirenIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
