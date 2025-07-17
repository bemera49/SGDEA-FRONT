import { TestBed } from '@angular/core/testing';
import { JuridicalService } from './juridical.service';

describe('JuridicalService', () => {
    let service: JuridicalService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(JuridicalService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});