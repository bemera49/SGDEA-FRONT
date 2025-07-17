import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuridicaFormComponent } from './juridica-form.component';

describe('JuridicaFormComponent', () => {
  let component: JuridicaFormComponent;
  let fixture: ComponentFixture<JuridicaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ JuridicaFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JuridicaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
