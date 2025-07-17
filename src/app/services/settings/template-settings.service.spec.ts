import { TestBed } from '@angular/core/testing';

import { TemplateSettingsService } from './template-settings.service';

describe('TemplateSettingsService', () => {
  let service: TemplateSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemplateSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
