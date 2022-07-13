import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedDataService } from '../core/service/shared-data.service';
import { SearchResultComponent } from '../search-result/search-result.component';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let sharedDataService: SharedDataService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ HeaderComponent ]
    })
    .compileComponents();
    sharedDataService = TestBed.inject(SharedDataService);
    router = TestBed.inject(Router);

    RouterTestingModule.withRoutes([
      { path: 'search-result/mango', component: SearchResultComponent}
    ])

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have search form', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.pi-search-form input')).toBeTruthy();
  });

  it('should emit search value on change', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;


    spyOn(router, 'navigate').and.callFake(
      (commands: any[], extras?: any) => null
    );
    component.change('mango');
    expect(sharedDataService.searchTerm.value).toBe('mango');
  });

  it('should redirect if the search term has a value', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;


    spyOn(router, 'navigate').and.callFake(
      (commands: any[], extras?: any) => null
    );
    component.change('mango');
    expect(router.navigate).toHaveBeenCalled();
  });
});
