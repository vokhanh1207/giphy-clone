
export class GifDto {
    type: string;
    id: string;
    slug: string;
    url: string;
    bitly_url: string;
    embed_url: string;
    username: string;
    source: string;
    rating: string;
    content_url: string;
    user: string;
    source_tld: string;
    source_post_url: string;
    update_datetime: string;
    create_datetime: string;
    import_datetime: string;
    trending_datetime: string;
    images: {
        [key:string]: {
            [key:string]: string;
        }
    };
    title: string;
}

export class Gif {
    type: string = null;
    id: string = null;
    slug: string = null;
    url: string = null;
    bitly_url: string = null;
    embed_url: string = null;
    username: string = null;
    source: string = null;
    rating: string = null;
    content_url: string = null;
    user: string = null;
    source_tld: string = null;
    source_post_url: string = null;
    update_datetime: Date = null;
    create_datetime: Date = null;
    import_datetime: Date = null;
    trending_datetime: Date = null;
    // todo: fulfill the type for images property
    images: any = {};
    title: string = null;

    constructor () {}

    // transforms dto object to front-end object
    static deserialize(source: GifDto): Gif {
        const target: Gif = new Gif();

        Object.keys(target).forEach(k => {
            const key = k as keyof Gif;
            target[key] = source[key];

            switch (key) {
                case 'update_datetime':
                case 'create_datetime':
                case 'import_datetime':
                case 'trending_datetime':
                    target[key] = new Date(source[key]);
                    break;
            }
        });

        return target;
    }
}
