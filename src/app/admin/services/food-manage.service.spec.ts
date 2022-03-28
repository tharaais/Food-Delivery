import { TestBed } from '@angular/core/testing';

import { FoodManageService } from './food-manage.service';

describe('FoodManageService', () => {
  let service: FoodManageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodManageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
