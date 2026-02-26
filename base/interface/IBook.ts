export interface IBookApiResponse {
    items: IbookItem[];
}

export interface IbookItem {
    id: string;
    volumeInfo: {
        title: string;
        authors?: string[];
        publisher: string;
        publishedDate: string;
        description: string;
        pageCount: number;
        categories: string[];
        imageLinks?: {
            thumbnail?: string;
        };
    };
}


    