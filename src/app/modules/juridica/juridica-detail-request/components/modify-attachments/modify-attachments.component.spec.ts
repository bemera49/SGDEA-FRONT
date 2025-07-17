import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyAttachmentsComponent } from './modify-attachments.component';

describe('ModifyAttachmentsComponent', () => {
  let component: ModifyAttachmentsComponent;
  let fixture: ComponentFixture<ModifyAttachmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyAttachmentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyAttachmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
