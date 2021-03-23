import { TestBed } from '@angular/core/testing';

import { UniqueService } from './unique.service';

describe('UniqueService', () => {
  let service: UniqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UniqueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
