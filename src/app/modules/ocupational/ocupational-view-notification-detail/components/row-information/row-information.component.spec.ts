import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RowInformationComponent } from './row-information.component';

describe('RowInformationComponent', () => {
  let component: RowInformationComponent;
  let fixture: ComponentFixture<RowInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RowInformationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RowInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
