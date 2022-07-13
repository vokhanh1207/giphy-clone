import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Gif } from '../core/model/gif';
import { SharedDataService } from '../core/service/shared-data.service';

@Component({
  selector: 'app-single-image',
  templateUrl: './single-image.component.html',
  styleUrls: ['./single-image.component.scss']
})
export class SingleImageComponent implements OnInit {

  @Input('image') image: Gif;

  @Input('favorites') favorites: {[key: string]: Gif};

  @Input('customClasses') customClasses: string;
  
  constructor(private sharedDataService: SharedDataService) { }

  ngOnInit(): void {
  }

  @HostBinding('class') get class() {
    return this.customClasses;
  }

  toggleFavorite(image: Gif, event: Event) {
    this.sharedDataService.toggleFavorite(image)
  
    event.stopPropagation();
    event.preventDefault();
    return;
  }
}
