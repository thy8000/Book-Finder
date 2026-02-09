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

    getTitle(): string {
        return this.bookData?.volumeInfo?.title || "";
    }

    getSubtitle(): string {
        return this.bookData?.volumeInfo?.subtitle || "";
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

    getISBN(): Array<{ type: string; identifier: string }> {
        return this.bookData?.volumeInfo?.industryIdentifiers || [];
    }

    getPublisher(): string {
        return this.bookData?.volumeInfo?.publisher || "";
    }

    getPublicationDate(): string {
        return this.bookData?.volumeInfo?.publishedDate || "";
    }
}
