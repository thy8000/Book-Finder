"use client";

import { MagnifyingGlassIcon } from "@phosphor-icons/react";

interface SearchProps {
    id: string;
    placeholder: string;
    onChange?: (value: string) => void;
}

export function Search({ id, placeholder, onChange }: SearchProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(e.target.value);
        }
    };

    return (
        <form className="flex items-center justify-center w-full max-w-2xl mx-auto">
            <div className="relative flex items-center w-full bg-white rounded-full shadow-lg overflow-hidden">
                <input
                    type="search"
                    id={id}
                    name={id}
                    placeholder={placeholder}
                    onChange={handleChange}
                    className="flex-1 px-6 py-4 text-neutral-800 placeholder-neutral-400 bg-transparent border-none outline-none focus:ring-0"
                />
                <button
                    type="submit"
                    className="flex items-center justify-center w-12 h-12 mr-2.5 bg-neutral-800 text-white rounded-full hover:bg-neutral-800/80 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-neutral-800 focus:ring-offset-2 cursor-pointer"
                    aria-label="Pesquisar"
                >
                    <MagnifyingGlassIcon className="w-5 h-5" weight="bold" />
                </button>
            </div>
        </form>
    );
}
