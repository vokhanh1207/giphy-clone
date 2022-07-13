import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Gif } from '../core/model/gif';

import { MosaicLayoutComponent } from './mosaic-layout.component';

describe('MosaicLayoutComponent', () => {
  let component: MosaicLayoutComponent;
  let fixture: ComponentFixture<MosaicLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MosaicLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MosaicLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render images if provided', () => {
    const fixture = TestBed.createComponent(MosaicLayoutComponent);
    fixture.detectChanges();
    const images = []
    for(let i = 0; i < 20; i++){
      const img = new Gif();
      img.images = {};
      images.push(img)
    }
    const comp = fixture.componentInstance;
    comp.images = images;
    fixture.detectChanges();

    const imgEls = fixture.debugElement.queryAll(By.css('.pi-mosaic-item'))
    const singleImgs = fixture.debugElement.queryAll(By.css('app-single-image'))
    expect(imgEls.length).toBe(20);
    expect(singleImgs.length).toBe(20);
  });
});
