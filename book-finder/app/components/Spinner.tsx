interface SpinnerProps {
    className?: string;
}

export function Spinner({ className = "" }: SpinnerProps) {
    return (
        <div
            className={`inline-block w-12 h-12 border-[3px] border-green-500 border-t-neutral-800 rounded-full animate-spin ${className}`}
            role="status"
            aria-label="Carregando"
        >
            <span className="sr-only">Carregando...</span>
        </div>
    );
}
