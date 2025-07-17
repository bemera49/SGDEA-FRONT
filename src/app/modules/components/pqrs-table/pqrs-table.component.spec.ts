import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PqrsTableComponent } from './pqrs-table.component';

describe('PqrsTableComponent', () => {
  let component: PqrsTableComponent;
  let fixture: ComponentFixture<PqrsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PqrsTableComponent],
      declarations: [ PqrsTableComponent ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PqrsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
