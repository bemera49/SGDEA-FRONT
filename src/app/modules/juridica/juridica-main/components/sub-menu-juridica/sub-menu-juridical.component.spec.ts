import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubMenuJuridicalComponent } from './sub-menu-juridical.component';

describe('SubMenuJuridicalComponent', () => {
  let component: SubMenuJuridicalComponent;
  let fixture: ComponentFixture<SubMenuJuridicalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubMenuJuridicalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubMenuJuridicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
