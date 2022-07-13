import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { GiphySearchRequestParam } from '../core/model/giphy-param';
import { GiphyService } from '../core/service/giphy.service';
import { SharedDataService } from '../core/service/shared-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  searchForm = new FormGroup({
    searchInput: new FormControl('')
  });

  hideUpload: boolean = false;

  constructor(
    private router: Router,
    private sharedDataService: SharedDataService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        this.hideUpload = event.url === '/upload';
      }
    });
  }

  change(query: string) {
    if (query.length === 0) {
      this.router.navigate(['/home']);
      return;
    }
    this.sharedDataService.searchTerm.next(query);
    this.router.navigate(['/search-result', query]);
  }
}
