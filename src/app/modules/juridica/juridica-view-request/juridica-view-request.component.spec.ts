import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuridicaViewRequestComponent } from './juridica-view-request.component';

describe('JuridicaViewRequestComponent', () => {
  let component: JuridicaViewRequestComponent;
  let fixture: ComponentFixture<JuridicaViewRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JuridicaViewRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JuridicaViewRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
