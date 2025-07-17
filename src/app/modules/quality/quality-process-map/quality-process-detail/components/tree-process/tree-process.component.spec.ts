import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeProcessComponent } from './tree-process.component';

describe('TreeProcessComponent', () => {
  let component: TreeProcessComponent;
  let fixture: ComponentFixture<TreeProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreeProcessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TreeProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
