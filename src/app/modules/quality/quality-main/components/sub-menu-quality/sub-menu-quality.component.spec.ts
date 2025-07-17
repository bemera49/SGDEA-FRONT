import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubMenuQualityComponent } from './sub-menu-quality.component';

describe('SubMenuQualityComponent', () => {
  let component: SubMenuQualityComponent;
  let fixture: ComponentFixture<SubMenuQualityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubMenuQualityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubMenuQualityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
