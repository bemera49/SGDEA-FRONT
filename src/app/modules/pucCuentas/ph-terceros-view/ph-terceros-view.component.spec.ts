import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhTercerosViewComponent } from './ph-terceros-view.component';

describe('PhTercerosViewComponent', () => {
  let component: PhTercerosViewComponent;
  let fixture: ComponentFixture<PhTercerosViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhTercerosViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhTercerosViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
