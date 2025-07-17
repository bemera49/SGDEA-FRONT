import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuridicaDetailRequestComponent } from './juridica-detail-request.component';

describe('JuridicaDetailRequestComponent', () => {
  let component: JuridicaDetailRequestComponent;
  let fixture: ComponentFixture<JuridicaDetailRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JuridicaDetailRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JuridicaDetailRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
