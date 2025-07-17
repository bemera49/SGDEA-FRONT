import { TestBed } from '@angular/core/testing';
import { TiposDocumentalesService } from './tipos_documentales.service';

describe('TiposDocumentalesService', () => {
    let service: TiposDocumentalesService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(TiposDocumentalesService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});