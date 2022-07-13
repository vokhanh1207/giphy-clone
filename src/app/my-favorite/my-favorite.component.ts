import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Gif } from '../core/model/gif';
import { SharedDataService } from '../core/service/shared-data.service';

@Component({
  selector: 'app-my-favorite',
  templateUrl: './my-favorite.component.html',
  styleUrls: ['./my-favorite.component.scss']
})
export class MyFavoriteComponent implements OnInit, OnDestroy {

  private _destroyed = new Subject<void>();

  images: Gif[] = [];

  favorites: {[key:string]: Gif} = {};

  constructor(private sharedDataService: SharedDataService) { }

  ngOnInit(): void {
    this.sharedDataService.favoriteImages
      .pipe(takeUntil(this._destroyed))
      .subscribe(favorites => {
        this.favorites = favorites;
        this.images = Object.values(this.favorites);
      });
  }

  ngOnDestroy(): void {
    this._destroyed.next();
  }
}
