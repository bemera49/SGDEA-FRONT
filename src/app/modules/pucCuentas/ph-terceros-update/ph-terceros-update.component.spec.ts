import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhTercerosUpdateComponent } from './ph-terceros-update.component';

describe('PhTercerosUpdateComponent', () => {
  let component: PhTercerosUpdateComponent;
  let fixture: ComponentFixture<PhTercerosUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhTercerosUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhTercerosUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
