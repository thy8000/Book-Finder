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

    getPageCount(): number {
        return this.bookData?.volumeInfo?.pageCount || 0;
    }

    getLanguage(): string {
        return this.bookData?.volumeInfo?.language || "";
    }

    isBuyable(): boolean {
        return this.bookData?.saleInfo?.saleability === "FOR_SALE";
    }

    getPrice(): number {
        var amount = this.bookData?.saleInfo?.listPrice?.amount || 0;

        if (amount === 0 || amount === null || amount === undefined) {
            return 0;
        }

        amount = Number(amount);

        return amount.toFixed(2).replace('.', ',');
    }

    getCurrencyCode(): string {
        const currencyCode = this.bookData?.saleInfo?.listPrice?.currencyCode || "";

        if (currencyCode === "BRL") {
            return "R$";
        }

        return currencyCode;
    }

    getBuyLink(): string {
        return this.bookData?.saleInfo?.buyLink || "";
    }

    getDescription(): string {
        return this.bookData?.volumeInfo?.description || "";
    }

    getGenres(): string[] {
        return this.bookData?.volumeInfo?.categories || [];
    }

    getAverageRating(): number {
        var averageRating = this.bookData?.volumeInfo?.averageRating || 0;
        averageRating = parseFloat(averageRating);

        return averageRating;
    }

    getRatingCount(): number {
        return this.bookData?.volumeInfo?.ratingsCount || 0;
    }
}
