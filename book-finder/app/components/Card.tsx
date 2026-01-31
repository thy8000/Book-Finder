interface CardProps {
    book_data: Object;
}

export function Card({ book_data }: CardProps) {
    // Dados mockados por enquanto
    const mockData = {
        title: "Learning React",
        author: "Alex Johnson",
        description: "A comprehensive guide to mastering React.js and modern web development. This book covers everything from the basics to advanced concepts, helping you build scalable and maintainable applications.",
        imageUrl: "https://placehold.co/100x142"
    };

    return (
        <a href="#" className="group flex flex-col overflow-hidden">
            {/* Imagem com aspect-ratio 2/1 */}
            <picture className="relative aspect-[240/340] rounded-lg overflow-hidden">
                <img
                    src={mockData.imageUrl}
                    alt={mockData.title}
                    className="w-full h-full object-cover"
                />
            </picture>

            {/* Conteúdo do card */}
            <div className="py-6 flex flex-col gap-3">
                {/* Título */}
                <h3 className="text-xl font-bold text-neutral-50 group-hover:text-green-500 transition-colors duration-200">
                    {mockData.title}
                </h3>

                {/* Autor */}
                <p className="text-sm text-neutral-200 group-hover:text-green-500 transition-colors duration-200">
                    {mockData.author}
                </p>

                {/* Descrição com line-clamp de 3 linhas */}
                <p className="text-sm text-neutral-400 line-clamp-3 group-hover:text-green-500 transition-colors duration-200">
                    {mockData.description}
                </p>
            </div>
        </a>
    );
}
