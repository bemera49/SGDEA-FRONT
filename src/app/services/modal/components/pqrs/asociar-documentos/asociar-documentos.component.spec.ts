import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsociarDocumentosComponent } from './asociar-documentos.component';

describe('AsociarDocumentosComponent', () => {
  let component: AsociarDocumentosComponent;
  let fixture: ComponentFixture<AsociarDocumentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsociarDocumentosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AsociarDocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
