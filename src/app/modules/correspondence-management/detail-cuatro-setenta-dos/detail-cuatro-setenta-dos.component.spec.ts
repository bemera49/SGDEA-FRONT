import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCuatroSetentaDosComponent } from './detail-cuatro-setenta-dos.component';

describe('DetailCuatroSetentaDosComponent', () => {
  let component: DetailCuatroSetentaDosComponent;
  let fixture: ComponentFixture<DetailCuatroSetentaDosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailCuatroSetentaDosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailCuatroSetentaDosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
