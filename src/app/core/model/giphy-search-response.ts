import { Gif, GifDto } from "./gif";

export interface Pagination {
    offset: number;
    total_count: number;
    count: number;
}

export interface GiphySearchResponseDto<T> {
    data: T[];
    pagination: {
        offset: string;
        total_count: string;
        count: string;
    };
    meta: {
        [key: string]: string
    };
}

export class GiphySearchResponse {
    data: Gif[];
    pagination: Pagination;
    meta: GiphyMetaData;

    static toData(
        response: GiphySearchResponseDto<GifDto>
    ): GiphySearchResponse {
        const result = new GiphySearchResponse();
        if (Array.isArray(response.data)) {
            result.data = response.data.map(item => Gif.deserialize(item));
        }

        if (response.pagination) {
            result.pagination = {
                offset: +response.pagination.offset,
                total_count: +response.pagination.total_count,
                count: +response.pagination.count
            }
        }

        return result;
    }
}

export class GiphyImageDetailsResponseDto<T> {
    data: T;
    meta: {
        [key: string]: string
    };
}
export class GiphyImageDetailsResponse {
    data: Gif;
    meta: GiphyMetaData;

    static toData(
        response: GiphyImageDetailsResponseDto<GifDto>
    ): GiphyImageDetailsResponse {
        const result = new GiphyImageDetailsResponse();
        result.data = Gif.deserialize(response.data)
        return result;
    }
}

export class GiphyMetaData {
    msg: string;
    status: number;
}