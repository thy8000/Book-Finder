"use client";

import { use, useEffect, useState } from "react";

import { Header, BookCard } from "@/app/components";
import { GoogleBooksService } from "@/app/services/GoogleBooks";
import { Book } from "@/app/entities/Book";

import { StarIcon, StarHalfIcon } from "@phosphor-icons/react";

export default function Page({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = use(params);
    const [bookData, setBookData] = useState<Book | null>(null);
    const [bookError, setBookError] = useState<string | null>(null);
    const [relatedBooks, setRelatedBooks] = useState<any[]>([]);
    const [relatedBooksError, setRelatedBooksError] = useState<string | null>(null);

    useEffect(() => {
        const service = new GoogleBooksService();

        const fetchBook = async () => {
            const { data, status } = await service.getBook(slug);

            if (status !== 200) {
                setBookError(data?.error || "Erro ao buscar livro");
                return;
            }

            setBookData(new Book(data));
        };

        fetchBook();
    }, [slug]);

    useEffect(() => {
        if (!bookData) return;

        const service = new GoogleBooksService();

        const fetchRelatedBooks = async () => {
            const { data, status } = await service.getRelatedBooks(bookData.getAuthors() || []);

            if (status !== 200) {
                setRelatedBooksError(data?.error || "Erro ao buscar livros relacionados");
                return;
            }

            setRelatedBooks(data.items || []);
        };

        fetchRelatedBooks();
    }, [bookData]);

    return (
        <div>
            <main className="flex flex-col gap-10">
                <Header />

                <div className="container">
                    <section className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">

                        <div className="md:col-span-8 order-2 md:order-1 flex flex-col justify-center">
                            {bookData?.getTitle() && (
                                <h1 className="text-xl md:text-4xl font-bold text-green-500 mb-2">{bookData?.getTitle()}</h1>
                            )}
                            {bookData?.getSubtitle() && (
                                <h2 className="text-xl text-gray-500 mb-4">{bookData?.getSubtitle()}</h2>
                            )}

                            {bookData?.getAuthors() && bookData.getAuthors().length > 0 && (
                                <ul className="flex flex-wrap gap-2 list-none text-lg mb-6">
                                    <b className="text-neutral-100 font-semibold">Por:</b> <li className="text-neutral-300">{bookData.getAuthors().join(", ")}</li>
                                </ul>
                            )}

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-neutral-800 p-6 rounded-lg border border-neutral-700">
                                {bookData?.getISBN() && bookData.getISBN().length > 0 && (
                                    bookData.getISBN().map((isbn: { type: string; identifier: string }) => (
                                        <div key={isbn?.identifier}>
                                            <span className="block text-xs text-neutral-100 uppercase font-bold">{isbn?.type || "ISBN-10"}</span>
                                            <span className="font-mono text-sm text-neutral-300">{isbn?.identifier}</span>
                                        </div>
                                    ))
                                )}
                                {bookData?.getPublisher() && (
                                    <div>
                                        <span className="block text-xs text-neutral-100 uppercase font-bold">Editora</span>
                                        <span className="font-mono text-sm text-neutral-300">{bookData.getPublisher()}</span>
                                    </div>
                                )}
                                {bookData?.getPublicationDate() && (
                                    <div>
                                        <span className="block text-xs text-neutral-100 uppercase font-bold">Publicação</span>
                                        <span className="font-mono text-sm text-neutral-300">{new Date(bookData.getPublicationDate()).toLocaleDateString("pt-BR")}</span>
                                    </div>
                                )}
                                {bookData?.getPageCount() && bookData.getPageCount() > 0 && (
                                    <div>
                                        <span className="block text-xs text-neutral-100 uppercase font-bold">Páginas</span>
                                        <span className="font-mono text-sm text-neutral-300">{bookData.getPageCount()} págs</span>
                                    </div>
                                )}
                                {bookData?.getLanguage() && bookData.getLanguage() !== "" && (
                                    <div>
                                        <span className="block text-xs text-neutral-100 uppercase font-bold">Idioma</span>
                                        <span className="font-mono text-sm text-neutral-300">{bookData.getLanguage()}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="md:col-span-4 order-1 md:order-2 flex justify-center md:justify-end">
                            <picture className="w-48 md:w-64 aspect-[2/3] bg-gray-200 rounded-lg shadow-xl overflow-hidden relative">
                                {bookData && bookData.getThumbnail('extraLarge') && (
                                    <img src={bookData?.getThumbnail('extraLarge')} alt={bookData?.getCompleteName()} className="object-cover w-full h-full" />
                                )}
                            </picture>
                        </div>
                    </section>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        <div className="lg:col-span-8 space-y-12">
                            {bookData?.isBuyable() && (
                                <section className="bg-neutral-800 border border-neutral-700 p-6 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                                    <div>
                                        <h3 className="font-bold text-lg text-neutral-100">Disponível para compra</h3>
                                        <p className="text-sm text-neutral-300">A partir de {bookData.getCurrencyCode()} {bookData.getPrice()}</p>
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                                        <a href={bookData.getBuyLink()} target="_blank" className="bg-green-500 hover:bg-green-500/80 text-neutral-100 font-bold py-3 px-6 rounded-lg transition shadow-md w-full sm:w-auto text-center">
                                            Comprar Agora
                                        </a>
                                    </div>
                                </section>
                            )}

                            {bookData?.getDescription() && (
                                <section>
                                    <h3 className="text-2xl font-bold text-neutral-100 mb-4 border-b border-neutral-700 pb-2">Sinopse</h3>
                                    <div className="prose max-w-none text-neutral-300 leading-relaxed space-y-4">
                                        {bookData.getDescription()}
                                    </div>
                                </section>
                            )}
                        </div>

                        <aside className="lg:col-span-4 space-y-8">

                            <div className="bg-neutral-800 p-6 rounded-xl border border-neutral-700">
                                <h3 className="font-bold text-neutral-100 mb-4 uppercase text-sm tracking-wider">Classificação</h3>

                                {bookData?.getGenres() && bookData.getGenres().length > 0 && (
                                    <div className="mb-6">
                                        <h4 className="text-sm font-semibold text-neutral-100 mb-2">Gêneros</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {bookData.getGenres().map((genre: string) => (
                                                <span key={genre} className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-600">{genre}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {!Number.isNaN(bookData?.getAverageRating()) && Number(bookData?.getAverageRating()) > 0 && (
                                    <div className="mb-6">
                                        <h4 className="text-sm font-semibold text-neutral-100 mb-2">Classificação (Média)</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {Array.from({ length: bookData?.getAverageRating() || 0 }).map((_, index) => (
                                                <StarIcon key={index} weight="fill" className="w-4 h-4 text-yellow-500" />
                                            ))}

                                            {!Number.isInteger(bookData?.getAverageRating()) && (
                                                <StarHalfIcon size={32} weight="fill" className="w-4 h-4 text-yellow-500" />
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </aside>
                    </div>

                    {relatedBooks && relatedBooks.length > 0 && (
                        <section className="mt-16 pt-10 border-t border-neutral-700">
                            <h2 className="text-2xl font-bold text-neutral-100 mb-6">Livros Relacionados</h2>

                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                                {relatedBooks.map((book: any) => (
                                    <BookCard key={book.id} bookData={book} />
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </main>
        </div>
    )
}