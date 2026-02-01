export class Book {
    private bookData: any;

    constructor(bookData: any) {
        this.bookData = bookData;
    }

    getCompleteName(): string {
        const title = this.bookData?.volumeInfo?.title || "";
        const subtitle = this.bookData?.volumeInfo?.subtitle || "";

        if (subtitle) {
            return `${title} ${subtitle}`;
        }

        return title;
    }

    getAuthors(): string[] {
        return this.bookData?.volumeInfo?.authors || [];
    }

    getThumbnail(size: string = 'thumbnail'): string {
        return this.bookData?.volumeInfo?.imageLinks?.[size] || "";
    }

    getDescription(): string {
        return this.bookData?.volumeInfo?.description || "";
    }

    getLink(): string {
        return `/book/${this.bookData?.id}`;
    }
}
