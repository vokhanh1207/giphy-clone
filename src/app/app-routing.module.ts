import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImageDetailsResolver } from './core/resolver/image-details.resolver';
import { HomePageComponent } from './home-page/home-page.component';
import { ImageDetailsComponent } from './image-details/image-details.component';
import { MyFavoriteComponent } from './my-favorite/my-favorite.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { UploadComponent } from './upload/upload.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomePageComponent,
  },
  {
    path: 'details/:id',
    component: ImageDetailsComponent,
    resolve: {
      image: ImageDetailsResolver
    }
  }, 
  {
    path: 'search-result/:query',
    component: SearchResultComponent,
  },
  {
    path: 'my-favorite',
    component: MyFavoriteComponent,
  },
  {
    path: 'upload',
    component: UploadComponent,
  },
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
