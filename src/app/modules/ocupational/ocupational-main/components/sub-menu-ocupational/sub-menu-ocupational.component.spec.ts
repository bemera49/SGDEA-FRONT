import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubMenuOcupationalComponent } from './sub-menu-ocupational.component';

describe('SubMenuOcupationalComponent', () => {
  let component: SubMenuOcupationalComponent;
  let fixture: ComponentFixture<SubMenuOcupationalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubMenuOcupationalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubMenuOcupationalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
