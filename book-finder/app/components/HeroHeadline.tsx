interface HeroHeadlineProps {
    title: string;
    description: string;
}

export function HeroHeadline({ title, description }: HeroHeadlineProps) {
    return (
        <div className="container">
            <section className="bg-neutral-800 border-neutral-700 border rounded p-10 text-center">
                <h2 className="text-3xl font-bold mb-4 text-green-500">{title}</h2>
                <p className="font-secondary text-neutral-300">
                    {description}
                </p>
            </section>
        </div>
    );
}
