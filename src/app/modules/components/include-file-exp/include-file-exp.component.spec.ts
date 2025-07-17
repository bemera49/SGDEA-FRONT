import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncludeFileExpComponent } from './include-file-exp.component';

describe('IncludeFileExpComponent', () => {
  let component: IncludeFileExpComponent;
  let fixture: ComponentFixture<IncludeFileExpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IncludeFileExpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IncludeFileExpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
