import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilingUpdateRequestComponent } from './filing-update-request.component';

describe('FilingUpdateRequestComponent', () => {
  let component: FilingUpdateRequestComponent;
  let fixture: ComponentFixture<FilingUpdateRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilingUpdateRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilingUpdateRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
