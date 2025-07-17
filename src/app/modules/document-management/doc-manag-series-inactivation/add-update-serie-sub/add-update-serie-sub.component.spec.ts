import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateSerieSubComponent } from './add-update-serie-sub.component';

describe('AddUpdateSerieSubComponent', () => {
  let component: AddUpdateSerieSubComponent;
  let fixture: ComponentFixture<AddUpdateSerieSubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateSerieSubComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUpdateSerieSubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
