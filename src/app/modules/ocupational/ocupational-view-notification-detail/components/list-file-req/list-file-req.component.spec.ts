import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFileReqComponent } from './list-file-req.component';

describe('ListFileReqComponent', () => {
  let component: ListFileReqComponent;
  let fixture: ComponentFixture<ListFileReqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFileReqComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListFileReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
