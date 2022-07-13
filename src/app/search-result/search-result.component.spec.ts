import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Gif } from '../core/model/gif';
import { GiphySearchResponse, Pagination } from '../core/model/giphy-search-response';
import { GiphyService } from '../core/service/giphy.service';

import { SearchResultComponent } from './search-result.component';

describe('SearchResultComponent', () => {
  let component: SearchResultComponent;
  let fixture: ComponentFixture<SearchResultComponent>;
  const route = ( {snapshot: {paramMap: new Map<string, string>().set('query', 'mango')}} as any) as ActivatedRoute;
  let giphyService: GiphyService;
  let searchResJson: string;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      declarations: [ SearchResultComponent ],
      providers: [{ provide: ActivatedRoute, useValue: route }],
    })
    .compileComponents();
    giphyService = TestBed.inject(GiphyService);

    const res = new GiphySearchResponse();
    res.data = [];
    res.pagination = {} as Pagination;
    for(let i = 0; i < 20; i++){
      res.data.push(new Gif)
    }
    searchResJson = JSON.stringify(res);

    fixture = TestBed.createComponent(SearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should do search and show 20 items', () => {
    const trendingServiceSpy = spyOn(giphyService, 'search').and.returnValue(of(JSON.parse(searchResJson)));
    const fixture = TestBed.createComponent(SearchResultComponent);
    fixture.detectChanges();

    component.ngOnInit();
    expect(component.images.length).toBe(20);
  });
  
  it('should load more images when scrolling down the bottom', () => {
    let spySearh = spyOn(giphyService, 'search').and.returnValue(of(JSON.parse(searchResJson)));
    const fixture = TestBed.createComponent(SearchResultComponent);
    fixture.detectChanges();
    component.ngOnInit();

    const newJson = JSON.parse(searchResJson);

    spySearh.and.returnValue(of(newJson));
  
    const scrollEvent = new Event('scroll', {currentTarget: {
      scrollY: document.body.scrollHeight
    }} as any)
    window.dispatchEvent(scrollEvent);
    expect(component.images.length > 20).toBeTrue();
    
  });
});
