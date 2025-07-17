import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocManagTrdMigrationsComponent } from './doc-manag-trd-migrations.component';

describe('DocManagTrdMigrationsComponent', () => {
  let component: DocManagTrdMigrationsComponent;
  let fixture: ComponentFixture<DocManagTrdMigrationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocManagTrdMigrationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocManagTrdMigrationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
