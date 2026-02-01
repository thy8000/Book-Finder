"use client";

import { useState, useDeferredValue, useEffect, useRef } from "react";
import { Search, Spinner } from "./";
import { GoogleBooksService } from "../services/GoogleBooks";
import { BookCard } from "./BookCard";

export function BookSearch() {
    const [inputValue, setInputValue] = useState("");
    const deferredQuery = useDeferredValue(inputValue);
    const [loading, setLoading] = useState(false);
    const [books, setBooks] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [noResults, setNoResults] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const hasTypedRef = useRef(false);

    useEffect(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        if (!deferredQuery.trim()) {
            setBooks([]);
            setError(null);
            setNoResults(false);
            setLoading(false);
            hasTypedRef.current = false;
            return;
        }

        timeoutRef.current = setTimeout(async () => {
            if (hasTypedRef.current) {
                setLoading(true);
            }
            setError(null);
            setNoResults(false);

            try {
                const googleBooksService = new GoogleBooksService();
                const { data, status } = await googleBooksService.getBooks(deferredQuery);

                if (status === 200 && data?.items) {
                    setBooks(data.items);
                    setNoResults(false);
                    setError(null);
                } else if (status === 404 && !data?.items) {
                    setBooks([]);
                    setNoResults(true);
                    setError(null);
                } else if (status >= 400) {
                    setBooks([]);
                    setNoResults(false);
                    const errorMessage = typeof data?.error === 'string'
                        ? data.error
                        : data?.error?.message || `Erro ao buscar livros (status: ${status})`;
                    setError(errorMessage);
                }
            } catch (err) {
                setBooks([]);
                setNoResults(false);
                setError("Erro desconhecido ao buscar livros");
            } finally {
                setLoading(false);
            }
        }, 1000);

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [deferredQuery]);

    const handleSearch = (value: string) => {
        setInputValue(value);

        if (value.trim() && !hasTypedRef.current) {
            hasTypedRef.current = true;
        }
    };

    return (
        <>
            <Search
                id="search"
                placeholder="Pesquisar por título, autor ou assunto"
                onChange={handleSearch}
                hasButton={false}
            />

            {loading && (
                <div className="flex justify-center">
                    <Spinner />
                </div>
            )}

            {error && (
                <div className="text-center text-red-500">
                    {error}
                </div>
            )}

            {noResults && !loading && !error && (
                <div className="text-center text-neutral-400">
                    Sua busca não retornou nenhum resultado
                </div>
            )}

            {!loading && !error && !noResults && books.length > 0 && (
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
                        {books.map((book) => (
                            <BookCard key={book.id} bookData={book} />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}
