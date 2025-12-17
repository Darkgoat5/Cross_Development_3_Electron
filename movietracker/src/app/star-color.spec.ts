import { TestBed } from '@angular/core/testing';

import { StarColor } from './star-color';

describe('StarColor', () => {
  let service: StarColor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StarColor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
