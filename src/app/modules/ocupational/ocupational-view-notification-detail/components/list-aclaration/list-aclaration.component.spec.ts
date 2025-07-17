import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAclarationComponent } from './list-aclaration.component';

describe('ListAclarationComponent', () => {
  let component: ListAclarationComponent;
  let fixture: ComponentFixture<ListAclarationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAclarationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAclarationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
