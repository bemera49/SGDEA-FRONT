import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiFilesComponent } from './multi-files.component';

describe('MultiFilesComponent', () => {
  let component: MultiFilesComponent;
  let fixture: ComponentFixture<MultiFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiFilesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MultiFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
