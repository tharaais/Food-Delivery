import { TestBed } from '@angular/core/testing';

import { AdminLoginAuthGuard } from './admin-login-auth.guard';

describe('AdminLoginAuthGuard', () => {
  let guard: AdminLoginAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminLoginAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
