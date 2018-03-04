import { TestBed, inject } from '@angular/core/testing';

import { FirecloudService } from './firecloud.service';

describe('FirecloudService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FirecloudService]
    });
  });

  it('should be created', inject([FirecloudService], (service: FirecloudService) => {
    expect(service).toBeTruthy();
  }));
});
