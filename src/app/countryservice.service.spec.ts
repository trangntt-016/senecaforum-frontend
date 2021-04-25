import { TestBed } from '@angular/core/testing';

import { CountryserviceService } from './countryservice.service';

describe('CountryserviceService', () => {
  let service: CountryserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountryserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
