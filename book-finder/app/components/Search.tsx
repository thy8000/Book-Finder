import { MagnifyingGlassIcon } from "@phosphor-icons/react";

interface SearchProps {
    id: string;
    placeholder: string;
}

export function Search({ id, placeholder }: SearchProps) {
    return (
        <form className="flex items-center justify-center w-full max-w-2xl mx-auto">
            <div className="relative flex items-center w-full bg-white rounded-full shadow-lg overflow-hidden">
                <input
                    type="search"
                    id={id}
                    name={id}
                    placeholder={placeholder}
                    className="flex-1 px-6 py-4 text-gray-700 placeholder-gray-400 bg-transparent border-none outline-none focus:ring-0"
                />
                <button
                    type="submit"
                    className="flex items-center justify-center w-12 h-12 bg-black text-white rounded-full hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                    aria-label="Pesquisar"
                >
                    <MagnifyingGlassIcon className="w-5 h-5" weight="bold" />
                </button>
            </div>
        </form>
    );
}
