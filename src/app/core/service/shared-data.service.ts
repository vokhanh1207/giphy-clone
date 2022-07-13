import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Gif } from '../model/gif';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private localFavoriteImagesKey: string = 'piFavoriteImages';

  private localUploadedImagesKey: string = 'piUploadedImages';

  searchTerm: BehaviorSubject<string> = new BehaviorSubject('');

  favoriteImages: BehaviorSubject<{ [key: string]: Gif }> = new BehaviorSubject({});

  uploadedImageIDs: BehaviorSubject<string[]> = new BehaviorSubject([]);

  constructor() {

    let uploaded = [];
    let favorites = {};

    try {
      // load favorite images from local storage
      const localUploaded = localStorage.getItem(this.localUploadedImagesKey) || '[]';
      uploaded = JSON.parse(localUploaded);

      // load favorite images from local storage
      const localFavorite = localStorage.getItem(this.localFavoriteImagesKey) || '{}';
      favorites = JSON.parse(localFavorite);
    } catch (error) {
      throw Error('Error while reading local storage');
    }

    this.uploadedImageIDs.next(uploaded);
    this.favoriteImages.next(favorites);
  }

  toggleFavorite(image: Gif) {
    if (this.favoriteImages.value[image.id]) {
      delete this.favoriteImages.value[image.id]
    } else {
      this.favoriteImages.value[image.id] = image;
    }
    
    localStorage.setItem(this.localFavoriteImagesKey, JSON.stringify(this.favoriteImages.value));
    this.favoriteImages.next(this.favoriteImages.value);
  }

  addUploadedImage(id: string) {
    this.uploadedImageIDs.value.unshift(id);
    localStorage.setItem(this.localUploadedImagesKey, JSON.stringify(this.uploadedImageIDs.value))
    this.uploadedImageIDs.next(this.uploadedImageIDs.value);
  }

}
