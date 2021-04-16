import { TestBed } from '@angular/core/testing';

import { DatareqService } from './datareq.service';

describe('DatareqService', () => {
  let service: DatareqService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatareqService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
