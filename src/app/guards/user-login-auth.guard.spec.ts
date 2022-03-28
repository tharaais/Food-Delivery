import { TestBed } from '@angular/core/testing';

import { UserLoginAuthGuard } from './user-login-auth.guard';

describe('UserLoginAuthGuard', () => {
  let guard: UserLoginAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserLoginAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
