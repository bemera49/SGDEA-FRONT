import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilingWebPageIndexComponent } from './filing-web-page-index.component';

describe('FilingWebPageIndexComponent', () => {
  let component: FilingWebPageIndexComponent;
  let fixture: ComponentFixture<FilingWebPageIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilingWebPageIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilingWebPageIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
