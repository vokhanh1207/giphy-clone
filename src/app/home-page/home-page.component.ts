import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Gif } from '../core/model/gif';
import { GiphyRequestParam, GiphySearchRequestParam } from '../core/model/giphy-param';
import { GiphySearchResponse } from '../core/model/giphy-search-response';
import { GiphyService } from '../core/service/giphy.service';
import { SharedDataService } from '../core/service/shared-data.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {

  private _destroyed = new Subject<void>();
  
  images: Gif[] = [];

  loading: boolean = false;

  trendingResponse: GiphySearchResponse;

  currentBlock: number = 0;

  favorites: {[key:string]: Gif} = {};

  favoritesShowingImages: Gif[];

  constructor(
    private giphyService: GiphyService,
    private sharedDataService: SharedDataService
  ) {}

  ngOnInit(): void {
    // add some empty images to the view while loading.
    for(let i = 0; i < 15; i++) {
      this.images.push(new Gif());
    }

    this.sharedDataService.favoriteImages
      .pipe(takeUntil(this._destroyed))
      .subscribe(favorites => {
        this.favorites = favorites;
        this.favoritesShowingImages = Object.values(this.favorites);
      });
  
    this.giphyService.getTrendingImages().subscribe(result => {
      this.trendingResponse = result;
      this.images = this.trendingResponse.data;
    });
  }

  ngOnDestroy(): void {
    this._destroyed.next();
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
    if (this.loading || !this.trendingResponse) {
      return;
    }

    this.loading = true;

    const params = new GiphyRequestParam();
    params.offset = params.limit + this.trendingResponse.pagination.offset;

    this.giphyService.getTrendingImages(params).subscribe(result => {
      this.loading = false;
      this.trendingResponse = result;

      this.images.push(...this.trendingResponse.data);
    });
  }

}
