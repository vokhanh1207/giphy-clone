import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { DotLoadingComponent } from './dot-loading.component';

describe('DotLoadingComponent', () => {
  let component: DotLoadingComponent;
  let fixture: ComponentFixture<DotLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DotLoadingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DotLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should hide loading by default', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
    const dots = fixture.debugElement.queryAll(By.css('.pi-dot'))
    expect(dots.length).toBe(0);
  });

  it('should show loading when loading property is true', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    component.loading = true;
    fixture.detectChanges();
    expect(compiled.querySelector('.pi-loading-container')).toBeTruthy();
  });

  it('should have 7 dots', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    component.loading = true;
    fixture.detectChanges();
    const dots = fixture.debugElement.queryAll(By.css('.pi-dot'))
    expect(dots.length).toBe(6);
  });
});
