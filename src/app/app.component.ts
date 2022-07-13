import { Component, HostListener } from '@angular/core';
import { Gif } from './core/model/gif';
import { SharedDataService } from './core/service/shared-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pi-challenge';

  stickedHeader: boolean = false;

  constructor(private sharedDataService: SharedDataService) { }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    if (document.documentElement.scrollTop > 140) {
      this.stickedHeader = true;
    } else {
      this.stickedHeader = false;
    }
  }
}
