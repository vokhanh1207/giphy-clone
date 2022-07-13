import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  ActivatedRoute
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Gif } from '../model/gif';
import { GiphyService } from '../service/giphy.service';

@Injectable({
  providedIn: 'root'
})
export class ImageDetailsResolver implements Resolve<Gif> {

  constructor(private giphyService: GiphyService) {}
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Gif> {
    const id = route.paramMap.get('id');
    return this.giphyService.read(id);
  }
}
