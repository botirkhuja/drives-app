import { TestBed } from '@angular/core/testing';

import { SignoutResolverService } from './signout-resolver.service';

describe('SignoutResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SignoutResolverService = TestBed.get(SignoutResolverService);
    expect(service).toBeTruthy();
  });
});
