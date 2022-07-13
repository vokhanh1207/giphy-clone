import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ImageDetailsComponent } from './image-details.component';
const gifTestJson = `{"type":"gif","id":"tqj4m9BRURayxQAIW9","slug":"GrowthX-Club-monday-mood-morning-tqj4m9BRURayxQAIW9","url":"https://giphy.com/gifs/GrowthX-Club-monday-mood-morning-tqj4m9BRURayxQAIW9","bitly_url":"https://gph.is/g/ZrN1lMX","embed_url":"https://giphy.com/embed/tqj4m9BRURayxQAIW9","username":"GrowthX_Club","source":"","rating":"g","content_url":"","user":{"avatar_url":"https://media2.giphy.com/avatars/GrowthX_Club/8YNRb9CrRuyj.gif","banner_image":"https://media2.giphy.com/headers/GrowthX_Club/MQnP5W2mV5Im.jpeg","banner_url":"https://media2.giphy.com/headers/GrowthX_Club/MQnP5W2mV5Im.jpeg","profile_url":"https://giphy.com/GrowthX_Club/","username":"GrowthX_Club","display_name":"GrowthX","description":"","is_verified":false,"website_url":"http://www.growthx.club/","instagram_url":""},"source_tld":"","source_post_url":"","update_datetime":null,"create_datetime":null,"import_datetime":"2022-02-09T01:27:00.000Z","trending_datetime":null,"images":{"fixed_width_still":{"height":"289","size":"14805","url":"https://media2.giphy.com/media/tqj4m9BRURayxQAIW9/200w_s.gif?cid=3ba5dc214e3aa610b01989c9668d043edc3fa0f97ade2646&rid=200w_s.gif&ct=g","width":"200"},"preview_gif":{"height":"93","size":"48179","url":"https://media2.giphy.com/media/tqj4m9BRURayxQAIW9/giphy-preview.gif?cid=3ba5dc214e3aa610b01989c9668d043edc3fa0f97ade2646&rid=giphy-preview.gif&ct=g","width":"64"},"fixed_height_downsampled":{"height":"200","size":"72488","url":"https://media2.giphy.com/media/tqj4m9BRURayxQAIW9/200_d.gif?cid=3ba5dc214e3aa610b01989c9668d043edc3fa0f97ade2646&rid=200_d.gif&ct=g","webp":"https://media2.giphy.com/media/tqj4m9BRURayxQAIW9/200_d.webp?cid=3ba5dc214e3aa610b01989c9668d043edc3fa0f97ade2646&rid=200_d.webp&ct=g","webp_size":"39962","width":"138"},"preview":{"height":"384","mp4":"https://media2.giphy.com/media/tqj4m9BRURayxQAIW9/giphy-preview.mp4?cid=3ba5dc214e3aa610b01989c9668d043edc3fa0f97ade2646&rid=giphy-preview.mp4&ct=g","mp4_size":"27506","width":"265"},"fixed_height_small":{"height":"100","mp4":"https://media2.giphy.com/media/tqj4m9BRURayxQAIW9/100.mp4?cid=3ba5dc214e3aa610b01989c9668d043edc3fa0f97ade2646&rid=100.mp4&ct=g","mp4_size":"16112","size":"154922","url":"https://media2.giphy.com/media/tqj4m9BRURayxQAIW9/100.gif?cid=3ba5dc214e3aa610b01989c9668d043edc3fa0f97ade2646&rid=100.gif&ct=g","webp":"https://media2.giphy.com/media/tqj4m9BRURayxQAIW9/100.webp?cid=3ba5dc214e3aa610b01989c9668d043edc3fa0f97ade2646&rid=100.webp&ct=g","webp_size":"73712","width":"69"},"downsized":{"height":"480","size":"1844095","url":"https://media2.giphy.com/media/tqj4m9BRURayxQAIW9/giphy.gif?cid=3ba5dc214e3aa610b01989c9668d043edc3fa0f97ade2646&rid=giphy.gif&ct=g","width":"332"},"fixed_width_downsampled":{"height":"289","size":"109271","url":"https://media2.giphy.com/media/tqj4m9BRURayxQAIW9/200w_d.gif?cid=3ba5dc214e3aa610b01989c9668d043edc3fa0f97ade2646&rid=200w_d.gif&ct=g","webp":"https://media2.giphy.com/media/tqj4m9BRURayxQAIW9/200w_d.webp?cid=3ba5dc214e3aa610b01989c9668d043edc3fa0f97ade2646&rid=200w_d.webp&ct=g","webp_size":"69450","width":"200"},"fixed_width":{"height":"289","mp4":"https://media2.giphy.com/media/tqj4m9BRURayxQAIW9/200w.mp4?cid=3ba5dc214e3aa610b01989c9668d043edc3fa0f97ade2646&rid=200w.mp4&ct=g","mp4_size":"81619","size":"674633","url":"https://media2.giphy.com/media/tqj4m9BRURayxQAIW9/200w.gif?cid=3ba5dc214e3aa610b01989c9668d043edc3fa0f97ade2646&rid=200w.gif&ct=g","webp":"https://media2.giphy.com/media/tqj4m9BRURayxQAIW9/200w.webp?cid=3ba5dc214e3aa610b01989c9668d043edc3fa0f97ade2646&rid=200w.webp&ct=g","webp_size":"254348","width":"200"},"downsized_still":{"height":"480","size":"1844095","url":"https://media2.giphy.com/media/tqj4m9BRURayxQAIW9/giphy_s.gif?cid=3ba5dc214e3aa610b01989c9668d043edc3fa0f97ade2646&rid=giphy_s.gif&ct=g","width":"332"},"downsized_medium":{"height":"480","size":"1844095","url":"https://media2.giphy.com/media/tqj4m9BRURayxQAIW9/giphy.gif?cid=3ba5dc214e3aa610b01989c9668d043edc3fa0f97ade2646&rid=giphy.gif&ct=g","width":"332"},"original_mp4":{"height":"480","mp4":"https://media2.giphy.com/media/tqj4m9BRURayxQAIW9/giphy.mp4?cid=3ba5dc214e3aa610b01989c9668d043edc3fa0f97ade2646&rid=giphy.mp4&ct=g","mp4_size":"269191","width":"332"},"downsized_large":{"height":"480","size":"1844095","url":"https://media2.giphy.com/media/tqj4m9BRURayxQAIW9/giphy.gif?cid=3ba5dc214e3aa610b01989c9668d043edc3fa0f97ade2646&rid=giphy.gif&ct=g","width":"332"},"preview_webp":{"height":"268","size":"48930","url":"https://media2.giphy.com/media/tqj4m9BRURayxQAIW9/giphy-preview.webp?cid=3ba5dc214e3aa610b01989c9668d043edc3fa0f97ade2646&rid=giphy-preview.webp&ct=g","width":"186"},"original":{"frames":"54","hash":"d887c1548cf70a6f8e0faef20a4f1ad9","height":"480","mp4":"https://media2.giphy.com/media/tqj4m9BRURayxQAIW9/giphy.mp4?cid=3ba5dc214e3aa610b01989c9668d043edc3fa0f97ade2646&rid=giphy.mp4&ct=g","mp4_size":"269191","size":"1844095","url":"https://media2.giphy.com/media/tqj4m9BRURayxQAIW9/giphy.gif?cid=3ba5dc214e3aa610b01989c9668d043edc3fa0f97ade2646&rid=giphy.gif&ct=g","webp":"https://media2.giphy.com/media/tqj4m9BRURayxQAIW9/giphy.webp?cid=3ba5dc214e3aa610b01989c9668d043edc3fa0f97ade2646&rid=giphy.webp&ct=g","webp_size":"402830","width":"332"},"original_still":{"height":"480","size":"40551","url":"https://media2.giphy.com/media/tqj4m9BRURayxQAIW9/giphy_s.gif?cid=3ba5dc214e3aa610b01989c9668d043edc3fa0f97ade2646&rid=giphy_s.gif&ct=g","width":"332"},"fixed_height_small_still":{"height":"100","size":"4145","url":"https://media2.giphy.com/media/tqj4m9BRURayxQAIW9/100_s.gif?cid=3ba5dc214e3aa610b01989c9668d043edc3fa0f97ade2646&rid=100_s.gif&ct=g","width":"69"},"fixed_width_small":{"height":"145","mp4":"https://media2.giphy.com/media/tqj4m9BRURayxQAIW9/100w.mp4?cid=3ba5dc214e3aa610b01989c9668d043edc3fa0f97ade2646&rid=100w.mp4&ct=g","mp4_size":"25801","size":"276499","url":"https://media2.giphy.com/media/tqj4m9BRURayxQAIW9/100w.gif?cid=3ba5dc214e3aa610b01989c9668d043edc3fa0f97ade2646&rid=100w.gif&ct=g","webp":"https://media2.giphy.com/media/tqj4m9BRURayxQAIW9/100w.webp?cid=3ba5dc214e3aa610b01989c9668d043edc3fa0f97ade2646&rid=100w.webp&ct=g","webp_size":"112016","width":"100"},"looping":{"mp4":"https://media2.giphy.com/media/tqj4m9BRURayxQAIW9/giphy-loop.mp4?cid=3ba5dc214e3aa610b01989c9668d043edc3fa0f97ade2646&rid=giphy-loop.mp4&ct=g","mp4_size":"950678"},"downsized_small":{"height":"412","mp4":"https://media2.giphy.com/media/tqj4m9BRURayxQAIW9/giphy-downsized-small.mp4?cid=3ba5dc214e3aa610b01989c9668d043edc3fa0f97ade2646&rid=giphy-downsized-small.mp4&ct=g","mp4_size":"59136","width":"284"},"fixed_width_small_still":{"height":"145","size":"6646","url":"https://media2.giphy.com/media/tqj4m9BRURayxQAIW9/100w_s.gif?cid=3ba5dc214e3aa610b01989c9668d043edc3fa0f97ade2646&rid=100w_s.gif&ct=g","width":"100"},"fixed_height_still":{"height":"200","size":"11706","url":"https://media2.giphy.com/media/tqj4m9BRURayxQAIW9/200_s.gif?cid=3ba5dc214e3aa610b01989c9668d043edc3fa0f97ade2646&rid=200_s.gif&ct=g","width":"138"},"fixed_height":{"height":"200","mp4":"https://media2.giphy.com/media/tqj4m9BRURayxQAIW9/200.mp4?cid=3ba5dc214e3aa610b01989c9668d043edc3fa0f97ade2646&rid=200.mp4&ct=g","mp4_size":"41258","size":"395468","url":"https://media2.giphy.com/media/tqj4m9BRURayxQAIW9/200.gif?cid=3ba5dc214e3aa610b01989c9668d043edc3fa0f97ade2646&rid=200.gif&ct=g","webp":"https://media2.giphy.com/media/tqj4m9BRURayxQAIW9/200.webp?cid=3ba5dc214e3aa610b01989c9668d043edc3fa0f97ade2646&rid=200.webp&ct=g","webp_size":"170582","width":"138"},"480w_still":{"url":"https://media0.giphy.com/media/tqj4m9BRURayxQAIW9/480w_s.jpg?cid=3ba5dc214e3aa610b01989c9668d043edc3fa0f97ade2646&rid=480w_s.jpg&ct=g","width":"480","height":"694"}},"title":"Monday Morning Cat GIF by GrowthX"}`

describe('ImageDetailsComponent', () => {
  let component: ImageDetailsComponent;
  let fixture: ComponentFixture<ImageDetailsComponent>;
  const parsedTestGif = JSON.parse(gifTestJson);
  const route = ({ data: of({image: parsedTestGif}) } as any) as ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ ImageDetailsComponent ],
      providers: [{ provide: ActivatedRoute, useValue: route }],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the title', () => {
    const fixture = TestBed.createComponent(ImageDetailsComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.pi-title h2')?.textContent).toBe('Details');

  });

  it('should be able to get the image', () => {
    const fixture = TestBed.createComponent(ImageDetailsComponent);
    fixture.detectChanges();
    expect(component.image?.id).toBe(parsedTestGif.id)

  });

});
