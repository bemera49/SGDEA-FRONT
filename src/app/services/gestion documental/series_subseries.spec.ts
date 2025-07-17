import { TestBed } from '@angular/core/testing';
import { SeriesSubseriesService } from './series_subseries.service';

describe('SeriesSubseriesService', () => {
    let service: SeriesSubseriesService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(SeriesSubseriesService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});