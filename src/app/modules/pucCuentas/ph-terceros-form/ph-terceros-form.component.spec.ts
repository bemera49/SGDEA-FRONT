import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhTercerosFormComponent } from './ph-terceros-form.component';

describe('PhTercerosFormComponent', () => {
  let component: PhTercerosFormComponent;
  let fixture: ComponentFixture<PhTercerosFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhTercerosFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhTercerosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
