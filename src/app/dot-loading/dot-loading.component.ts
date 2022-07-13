import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dot-loading',
  templateUrl: './dot-loading.component.html',
  styleUrls: ['./dot-loading.component.scss']
})
export class DotLoadingComponent implements OnInit {

  @Input('loading') loading: boolean = false;
  
  constructor() { }

  ngOnInit(): void {
  }

}
