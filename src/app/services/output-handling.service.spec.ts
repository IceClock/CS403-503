import { TestBed } from '@angular/core/testing';

import { OutputHandlingService } from './output-handling.service';

describe('OutputHandlingService', () => {
  let service: OutputHandlingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OutputHandlingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
