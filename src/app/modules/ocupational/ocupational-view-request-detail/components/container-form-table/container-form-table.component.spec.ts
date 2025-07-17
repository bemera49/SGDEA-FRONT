import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerFormTableComponent } from './container-form-table.component';

describe('ContainerFormTableComponent', () => {
  let component: ContainerFormTableComponent;
  let fixture: ComponentFixture<ContainerFormTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContainerFormTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContainerFormTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
