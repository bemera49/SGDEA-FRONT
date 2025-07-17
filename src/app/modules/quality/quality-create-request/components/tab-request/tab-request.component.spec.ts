import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabRequestComponent } from './tab-request.component';

describe('TabRequestComponent', () => {
  let component: TabRequestComponent;
  let fixture: ComponentFixture<TabRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabRequestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TabRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
