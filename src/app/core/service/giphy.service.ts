import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GiphyImageDetailsResponse, GiphyImageDetailsResponseDto, GiphyMetaData, GiphySearchResponse, GiphySearchResponseDto } from '../model/giphy-search-response';
import { Gif, GifDto } from '../model/gif';
import { GiphyDetailsRequestParam, GiphyMultiDetailsRequestParam, GiphyRequestParam, GiphySearchRequestParam } from '../model/giphy-param';

@Injectable({
  providedIn: 'root'
})
export class GiphyService {

  url: string = environment.giphyUrl;

  constructor(private http: HttpClient) { }

  getTrendingImages(params: GiphyRequestParam = new GiphyRequestParam()): Observable<GiphySearchResponse> {
    return this.http.get<GiphySearchResponseDto<GifDto>>(this.url + '/v1/gifs/trending', {
      params: {...params}
    }).pipe(
      map(result => GiphySearchResponse.toData(result))
    )
  }

  search(params: GiphySearchRequestParam = new GiphySearchRequestParam()): Observable<GiphySearchResponse> {
    return this.http.get<GiphySearchResponseDto<GifDto>>(this.url + '/v1/gifs/search', {
      params: {...params}
    }).pipe(
      map(result => GiphySearchResponse.toData(result))
    )
  }

  read(id: string): Observable<Gif> {
    const params: GiphyDetailsRequestParam = new GiphyDetailsRequestParam(id);

    return this.http.get<GiphyImageDetailsResponseDto<GifDto>>(`${this.url}/v1/gifs/${id}`, {
      params: {...params}
    }).pipe(
      map(result => GiphyImageDetailsResponse.toData(result).data)
    )
  }

  readImages(ids: string[]): Observable<GiphySearchResponse> {
    const params: GiphyMultiDetailsRequestParam = new GiphyMultiDetailsRequestParam(ids);
   
    return this.http.get<GiphySearchResponseDto<GifDto>>(`${this.url}/v1/gifs`, {
      params: {...params.toParams()}
    }).pipe(
      map(result => GiphySearchResponse.toData(result))
    )
  }

  upload(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<any>(`https://upload.giphy.com/v1/gifs?api_key=${environment.giphyKey}`,
      formData
    ).pipe(
      map(result => result.data.id)
    )
  }
}
