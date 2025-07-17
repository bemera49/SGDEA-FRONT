import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabDivulgacionComponent } from './tab-divulgacion.component';

describe('TabDivulgacionComponent', () => {
  let component: TabDivulgacionComponent;
  let fixture: ComponentFixture<TabDivulgacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabDivulgacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabDivulgacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
