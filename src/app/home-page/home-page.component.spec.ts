import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { Gif } from '../core/model/gif';
import { GiphySearchResponse } from '../core/model/giphy-search-response';
import { GiphyService } from '../core/service/giphy.service';

import { HomePageComponent } from './home-page.component';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  let giphyService: GiphyService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ HomePageComponent ],
    })
    .compileComponents();
    giphyService = TestBed.inject(GiphyService);

    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 15 empty images by default', () => {
    expect(component.images.length).toBe(15);
  });
  
  it('should have trending section', () => {
    const fixture = TestBed.createComponent(HomePageComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.pi-home-images .pi-title h2')?.textContent).toContain('Trending');
  });

  it('should get trending images', fakeAsync(() => {
    const res = new GiphySearchResponse();
    res.data = [];
    for(let i = 0; i < 20; i++){
      res.data.push(new Gif)
    }
    const trendingServiceSpy = spyOn(giphyService, 'getTrendingImages').and.returnValue(of(res));
    
    const fixture = TestBed.createComponent(HomePageComponent);
    fixture.detectChanges();

    component.ngOnInit();
    expect(component.images.length).toBe(20);
  }));
});
