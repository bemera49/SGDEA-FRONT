import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerRadioComponent } from './container-radio.component';

describe('ContainerRadioComponent', () => {
  let component: ContainerRadioComponent;
  let fixture: ComponentFixture<ContainerRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContainerRadioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContainerRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
