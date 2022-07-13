import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../core/model/gif';

@Component({
  selector: 'app-mosaic-layout',
  templateUrl: './mosaic-layout.component.html',
  styleUrls: ['./mosaic-layout.component.scss']
})
export class MosaicLayoutComponent implements OnInit {

  @Input('favorites') favorites: {[key: string]: Gif} = {};

  @Input('images') images: Gif[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
