import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { Gif } from '../core/model/gif';
import { GiphySearchRequestParam } from '../core/model/giphy-param';
import { GiphyService } from '../core/service/giphy.service';
import { SharedDataService } from '../core/service/shared-data.service';
import { takeUntil } from 'rxjs/operators';
import { GiphySearchResponse } from '../core/model/giphy-search-response';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit, OnDestroy {

  private _destroyed = new Subject<void>();
  
  loading: boolean = true;

  images: Gif[] = [];

  searchResponse: GiphySearchResponse = new GiphySearchResponse();

  query: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private giphyService: GiphyService,
    private sharedDataService: SharedDataService) { }

  ngOnInit(): void {
    const snapshot = this.activatedRoute.snapshot;
    const query = snapshot.paramMap.get('query');

    this.sharedDataService.searchTerm.next(query);
    this.sharedDataService.searchTerm
      .pipe(takeUntil(this._destroyed))
      .subscribe(query => {
        this.query = query;
        this.search(query);
      });
  }

  ngOnDestroy(): void {
    this._destroyed.next();
  }

  search(query: string) {
    const params = new GiphySearchRequestParam();
    params.q = query;

    this.giphyService.search(params).subscribe(result => {
      this.loading = false;
      this.images = result.data;
      this.searchResponse = result;
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    //In chrome and some browser scroll is given to body tag
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    let docHeight = document.documentElement.scrollHeight;
  
    // srolldown - load more images when the user comes close to the end of the page
    if (docHeight - pos < 50) {
      this.loadMoreImages();
    }
  }

  loadMoreImages() {
    if (this.loading || !this.searchResponse) {
      return;
    }

    this.loading = true;
    const params = new GiphySearchRequestParam();
    params.offset = params.limit + this.searchResponse.pagination.offset;
    params.q = this.query;

    this.giphyService.search(params).subscribe(result => {
      this.loading = false;
      this.searchResponse = result;

      this.images.push(...result.data);
    });
  }
}
