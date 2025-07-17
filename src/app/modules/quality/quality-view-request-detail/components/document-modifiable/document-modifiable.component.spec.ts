import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentModifiableComponent } from './document-modifiable.component';

describe('DocumentModifiableComponent', () => {
  let component: DocumentModifiableComponent;
  let fixture: ComponentFixture<DocumentModifiableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentModifiableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocumentModifiableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
