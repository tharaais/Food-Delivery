import { TestBed } from '@angular/core/testing';

import { MealsRequestsService } from './meals-requests.service';

describe('MealsRequestsService', () => {
  let service: MealsRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MealsRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
