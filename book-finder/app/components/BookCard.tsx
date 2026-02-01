import { Book } from "../entities/Book";

interface CardProps {
    bookData: Object;
}

export function BookCard({ bookData }: CardProps) {
    const book = new Book(bookData);

    return (
        <a href={book.getLink()} className="group flex flex-col overflow-hidden">
            <picture className="relative aspect-[240/340] rounded-lg overflow-hidden">
                <img
                    src={book.getThumbnail()}
                    alt={book.getCompleteName()}
                    className="w-full h-full object-cover"
                />
            </picture>

            <div className="py-6 flex flex-col gap-3">
                <h3 className="text-base font-bold text-neutral-50 group-hover:text-green-500 transition-colors duration-200 line-clamp-3">
                    {book.getCompleteName()}
                </h3>

                <p className="text-sm text-neutral-200 group-hover:text-green-500 transition-colors duration-200">
                    {book.getAuthors().join(", ")}
                </p>

                <p className="text-sm text-neutral-400 line-clamp-3 group-hover:text-green-500 transition-colors duration-200">
                    {book.getDescription()}
                </p>
            </div>
        </a>
    );
}
