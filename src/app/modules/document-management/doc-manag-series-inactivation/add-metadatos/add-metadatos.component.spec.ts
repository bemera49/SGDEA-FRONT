import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMetadatosComponent } from './add-metadatos.component';

describe('AddSubseriesComponent', () => {
  let component: AddMetadatosComponent;
  let fixture: ComponentFixture<AddMetadatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMetadatosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMetadatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
