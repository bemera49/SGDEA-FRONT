import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAnexosComponent } from './detail-anexos.component';

describe('DetailAnexosComponent', () => {
  let component: DetailAnexosComponent;
  let fixture: ComponentFixture<DetailAnexosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailAnexosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailAnexosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
