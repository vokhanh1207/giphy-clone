import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { DotLoadingComponent } from './dot-loading/dot-loading.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { MosaicLayoutComponent } from './mosaic-layout/mosaic-layout.component';
import { ImageDetailsComponent } from './image-details/image-details.component';
import { HeaderComponent } from './header/header.component';
import { SingleImageComponent } from './single-image/single-image.component';
import { UploadComponent } from './upload/upload.component';
import { MyFavoriteComponent } from './my-favorite/my-favorite.component';
import { FileSelectDirective } from './core/directive/file-select.directive';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    DotLoadingComponent,
    SearchResultComponent,
    MosaicLayoutComponent,
    ImageDetailsComponent,
    HeaderComponent,
    SingleImageComponent,
    UploadComponent,
    MyFavoriteComponent,
    FileSelectDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
