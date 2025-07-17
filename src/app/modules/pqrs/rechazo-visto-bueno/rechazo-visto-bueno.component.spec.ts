import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechazoVistoBuenoComponent } from './rechazo-visto-bueno.component';

describe('RechazoVistoBuenoComponent', () => {
  let component: RechazoVistoBuenoComponent;
  let fixture: ComponentFixture<RechazoVistoBuenoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RechazoVistoBuenoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RechazoVistoBuenoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
