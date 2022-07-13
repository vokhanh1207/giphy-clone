import { Component, OnInit } from '@angular/core';
import { Gif } from '../core/model/gif';
import { GiphyService } from '../core/service/giphy.service';
import { SharedDataService } from '../core/service/shared-data.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  loading: boolean = true;

  uploading: boolean = false;

  currentUploadedCount: number = 0;

  totalUploading: number = 0;

  progressWidth: number = 10;

  images: Gif[] = [];

  showSuccessMessage: boolean = false;

  constructor(
    private giphyService: GiphyService,
    private sharedDataService: SharedDataService
  ) { }

  ngOnInit(): void {
    this.sharedDataService.uploadedImageIDs
      .pipe(take(1))
      .subscribe(ids => {
        if (ids.length === 0) {
          this.loading = false;
          return;
        }
        
        this.getUploaded(ids);
      });
  }

  getUploaded(ids: string[]) {
    this.giphyService.readImages(ids).subscribe(result => {
      this.loading = false;
      this.images = result.data;
    });
  }

  handleUpload(files: File[]) {
    this.uploading = true;
    this.totalUploading = files.length;
    this.calculateProgressWidth();

    files.forEach(file => {
      this.giphyService.upload(file).subscribe(id => {
        this.sharedDataService.addUploadedImage(id);
        this.loadImage(id);
        this.currentUploadedCount++;

        this.calculateProgressWidth();
        if(this.currentUploadedCount === this.totalUploading) {
          this.uploading = false;
          this.currentUploadedCount = 0;
          this.showSuccessMessage = true;
          setTimeout(() => {
            this.showSuccessMessage = false;
          }, 3000);
          return;
        }
      })
    });
  }

  loadImage(id: string) {
    this.giphyService.read(id).subscribe(image => {
      this.images.unshift(image)
    })
  }
  calculateProgressWidth() {
    this.progressWidth = (this.currentUploadedCount + 1) * 100 / this.totalUploading;
  }
}
