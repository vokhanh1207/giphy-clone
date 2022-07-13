import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { BehaviorSubject, of } from 'rxjs';
import { Gif } from '../core/model/gif';
import { GiphySearchResponse } from '../core/model/giphy-search-response';
import { GiphyService } from '../core/service/giphy.service';
import { SharedDataService } from '../core/service/shared-data.service';

import { UploadComponent } from './upload.component';

describe('UploadComponent', () => {
  let component: UploadComponent;
  let fixture: ComponentFixture<UploadComponent>;
  let giphyService: GiphyService;
  let sharedDataService: SharedDataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ UploadComponent ]
    })
    .compileComponents();
    giphyService = TestBed.inject(GiphyService);
    sharedDataService = TestBed.inject(SharedDataService);

    fixture = TestBed.createComponent(UploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an upload button', () => {
    const fixture = TestBed.createComponent(UploadComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.pi-upload-button')).toBeTruthy();
  });

  it('should load uploaded images', () => {
    sharedDataService.uploadedImageIDs = new BehaviorSubject(['NyQn58Met2ayw1uElj']);

    const readImagesRes = new GiphySearchResponse();
    readImagesRes.data = [new Gif()];
    let spyReadImages = spyOn(giphyService, 'readImages').and.returnValue(of(readImagesRes));
  
    const fixture = TestBed.createComponent(UploadComponent);
    fixture.detectChanges();
    component.ngOnInit();
    
    expect(component.images.length).toBe(1); 
  }); 
});
