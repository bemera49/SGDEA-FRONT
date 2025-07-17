import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelLinkComponent } from './cancel-link.component';

describe('CancelLinkComponent', () => {
  let component: CancelLinkComponent;
  let fixture: ComponentFixture<CancelLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CancelLinkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CancelLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
