import { TestBed } from '@angular/core/testing';

import { DriverActivationResolverService } from './driver-activation-resolver.service';

describe('DriverActivationResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DriverActivationResolverService = TestBed.get(DriverActivationResolverService);
    expect(service).toBeTruthy();
  });
});
