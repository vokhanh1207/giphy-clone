import { environment } from "src/environments/environment";

export class GiphyRequestParamBase {
    api_key: string = environment.giphyKey;
}

export class GiphyRequestParam extends GiphyRequestParamBase{
    limit: number = 20;
    offset: number = 0;
    rating?: string;
    random_id?: string;
    bundle?: string;
}

export class GiphySearchRequestParam extends GiphyRequestParam {
    q: string = null;
    lang: string = 'en';
}

export class GiphyDetailsRequestParam extends GiphyRequestParamBase{
    gif_id: string = null;
    random_id?: string;
    constructor(id: string) {
        super();
        this.gif_id = id;
    }
}

export class GiphyMultiDetailsRequestParam extends GiphyRequestParamBase {
    ids: string[] = [];
    random_id?: string;
    constructor(ids: string[] = []) {
        super();
        ids.forEach(id => {
            if (id) {
                this.ids.push(id);
            }
        })
    }

    toParams() {
        return {
            api_key: this.api_key,
            random_id: this.random_id,
            ids: this.ids.join(', ')
        };
    }
}
