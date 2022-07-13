import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { GiphyService } from './giphy.service';

describe('GiphyService', () => {
  let service: GiphyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
    });
    service = TestBed.inject(GiphyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('$url should have a value', () => {
    expect(service.url).toBeTruthy();
  });

  it('#getTrendingImages should return value from observable',
    (done: DoneFn) => {
      service.getTrendingImages().subscribe(value => {
        expect(value).toBeTruthy();
        expect(value.data?.length).toBe(20);
        done();
      });
    });

  it('#search should return value from observable',
    (done: DoneFn) => {
      service.search().subscribe(value => {
        expect(value).toBeTruthy();
        expect(value.data?.length).toBe(20);
        done();
      });
    });

  it('#read should return value from observable',
    (done: DoneFn) => {
      const testId = 'tqj4m9BRURayxQAIW9';
      service.read(testId).subscribe(value => {
        expect(value).toBeTruthy();
        expect(value.id).toBe(testId);
        done();
      });
    });
});
