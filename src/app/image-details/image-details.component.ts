import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Gif } from '../core/model/gif';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { SharedDataService } from '../core/service/shared-data.service';

@Component({
  selector: 'app-image-details',
  templateUrl: './image-details.component.html',
  styleUrls: ['./image-details.component.scss']
})
export class ImageDetailsComponent implements OnInit, OnDestroy {

  private _destroyed = new Subject<void>();

  image: Gif = new Gif();

  favorites: {[key: string]: Gif};
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private sharedDataService: SharedDataService
  ) { }

  ngOnInit(): void {
    // sroll top prevents the header is sticked from the previous page
    document.documentElement.scrollTop = 0;
    this.activatedRoute.data
      .pipe(takeUntil(this._destroyed))
      .subscribe(({ image }) => {
        this.image = image;
      });

    this.sharedDataService.favoriteImages
      .pipe(takeUntil(this._destroyed))
      .subscribe(favorites => {
        this.favorites = favorites;
      });
  }

  ngOnDestroy(): void {
    this._destroyed.next();
  }

  toggleFavorite(image: Gif) {
    this.sharedDataService.toggleFavorite(image);
  }
}
