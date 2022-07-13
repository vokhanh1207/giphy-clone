import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Gif } from '../core/model/gif';

import { SingleImageComponent } from './single-image.component';

describe('SingleImageComponent', () => {
  let component: SingleImageComponent;
  let fixture: ComponentFixture<SingleImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render an image if provided', () => {
    const fixture = TestBed.createComponent(SingleImageComponent);
    fixture.detectChanges();
    const image = new Gif();
    image.images = {
      original: {
        url: ''
      }
    }
    const comp = fixture.componentInstance;
    comp.image = image;
    comp.favorites = {};
    fixture.detectChanges();

    const imgEl = fixture.debugElement.queryAll(By.css('.pi-image img'));
    expect(imgEl).toBeTruthy();
  });
});
