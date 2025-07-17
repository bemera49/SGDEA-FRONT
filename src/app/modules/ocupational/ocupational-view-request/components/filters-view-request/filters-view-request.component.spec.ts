import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersViewRequestComponent } from './filters-view-request.component';

describe('FiltersViewRequestComponent', () => {
  let component: FiltersViewRequestComponent;
  let fixture: ComponentFixture<FiltersViewRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltersViewRequestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FiltersViewRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
