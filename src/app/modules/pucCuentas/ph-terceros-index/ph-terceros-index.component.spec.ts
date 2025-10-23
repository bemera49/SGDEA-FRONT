import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhTercerosIndexComponent } from './ph-terceros-index.component';

describe('PhTercerosIndexComponent', () => {
  let component: PhTercerosIndexComponent;
  let fixture: ComponentFixture<PhTercerosIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhTercerosIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhTercerosIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
