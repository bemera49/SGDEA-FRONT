import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuridicaMainComponent } from './juridica-main.component';

describe('JuridicaMainComponent', () => {
  let component: JuridicaMainComponent;
  let fixture: ComponentFixture<JuridicaMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JuridicaMainComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(JuridicaMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});