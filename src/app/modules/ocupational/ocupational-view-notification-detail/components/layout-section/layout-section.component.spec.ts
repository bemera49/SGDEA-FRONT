import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutSectionComponent } from './layout-section.component';

describe('LayoutSectionComponent', () => {
  let component: LayoutSectionComponent;
  let fixture: ComponentFixture<LayoutSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LayoutSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
