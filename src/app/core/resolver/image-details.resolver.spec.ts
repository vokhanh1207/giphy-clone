import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ImageDetailsResolver } from './image-details.resolver';

describe('ImageDetailsResolver', () => {
  let resolver: ImageDetailsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    resolver = TestBed.inject(ImageDetailsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
