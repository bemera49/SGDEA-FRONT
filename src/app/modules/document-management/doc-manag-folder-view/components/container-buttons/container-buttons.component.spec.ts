import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerButtonsComponent } from './container-buttons.component';

describe('ContainerButtonsComponent', () => {
  let component: ContainerButtonsComponent;
  let fixture: ComponentFixture<ContainerButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContainerButtonsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContainerButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
