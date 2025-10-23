import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhTercerosCreateComponent } from './ph-terceros-create.component';

describe('PhTercerosCreateComponent', () => {
  let component: PhTercerosCreateComponent;
  let fixture: ComponentFixture<PhTercerosCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhTercerosCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhTercerosCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
