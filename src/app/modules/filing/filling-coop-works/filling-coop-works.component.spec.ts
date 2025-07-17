import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FillingCoopWorksComponent } from './filling-coop-works.component';

describe('FillingCoopWorksComponent', () => {
  let component: FillingCoopWorksComponent;
  let fixture: ComponentFixture<FillingCoopWorksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FillingCoopWorksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FillingCoopWorksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
