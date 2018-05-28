import { TestBed, inject } from '@angular/core/testing';

import { FilterSideNavService } from './filter-side-nav.service';

describe('FilterSideNavService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FilterSideNavService]
    });
  });

  it('should be created', inject([FilterSideNavService], (service: FilterSideNavService) => {
    expect(service).toBeTruthy();
  }));
});
