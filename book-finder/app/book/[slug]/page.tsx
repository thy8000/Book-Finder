"use client";

import { use, useEffect, useState } from "react";

import { Header } from "@/app/components";
import { GoogleBooksService } from "@/app/services/GoogleBooks";
import { Book } from "@/app/entities/Book";

export default function Page({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = use(params);
    const [bookData, setBookData] = useState<Book | null>(null);
    const [bookError, setBookError] = useState<string | null>(null);

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

    return (
        <div>
            <main className="flex flex-col gap-10">
                <Header />

                <div className="container">
                    <section className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">

                        <div className="md:col-span-8 order-2 md:order-1 flex flex-col justify-center">
                            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-2">Cidade dos Ossos</h1>
                            <h2 className="text-xl text-gray-500 mb-4">Os Instrumentos Mortais - Vol. 1</h2>

                            <div className="text-lg mb-6">
                                Por: <a href="#" className="text-blue-600 hover:underline font-semibold">Cassandra Clare</a>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-gray-50 p-6 rounded-lg border border-gray-100">
                                <div>
                                    <span className="block text-xs text-gray-500 uppercase font-bold">ISBN</span>
                                    <span className="font-mono text-sm">978-8501000000</span>
                                </div>
                                <div>
                                    <span className="block text-xs text-gray-500 uppercase font-bold">Editora</span>
                                    <span className="text-sm">Galera Record</span>
                                </div>
                                <div>
                                    <span className="block text-xs text-gray-500 uppercase font-bold">Publicação</span>
                                    <span className="text-sm">Outubro, 2013</span>
                                </div>
                                <div>
                                    <span className="block text-xs text-gray-500 uppercase font-bold">Páginas</span>
                                    <span className="text-sm">462 págs</span>
                                </div>
                                <div>
                                    <span className="block text-xs text-gray-500 uppercase font-bold">Formato</span>
                                    <span className="text-sm">Capa Comum</span>
                                </div>
                                <div>
                                    <span className="block text-xs text-gray-500 uppercase font-bold">Idioma</span>
                                    <span className="text-sm">Português</span>
                                </div>
                            </div>
                        </div>

                        <div className="md:col-span-4 order-1 md:order-2 flex justify-center md:justify-end">
                            <div className="w-48 md:w-64 aspect-[2/3] bg-gray-200 rounded-lg shadow-xl overflow-hidden relative">
                                <img src="https://placehold.co/400x600/3b82f6/white?text=Capa+do+Livro" alt="Capa do Livro" className="object-cover w-full h-full" />
                            </div>
                        </div>
                    </section>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                        <div className="lg:col-span-8 space-y-12">

                            <section className="bg-blue-50 border border-blue-100 p-6 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div>
                                    <h3 className="font-bold text-lg text-blue-900">Disponível para compra</h3>
                                    <p className="text-sm text-blue-700">A partir de R$ 49,90</p>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition shadow-md w-full sm:w-auto text-center">
                                        Comprar Agora
                                    </button>
                                    <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-6 rounded-lg transition w-full sm:w-auto text-center">
                                        Ver Lojas
                                    </button>
                                </div>
                            </section>

                            <section>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2">Sinopse</h3>
                                <div className="prose max-w-none text-gray-700 leading-relaxed space-y-4">
                                    <p>
                                        Um mundo oculto está prestes a ser revelado... Quando Clary decide ir a Nova York se divertir numa discoteca, nunca poderia imaginar que testemunharia um assassinato - muito menos um assassinato cometido por três adolescentes cobertos por tatuagens enigmáticas e brandindo armas bizarras.
                                    </p>
                                    <p>
                                        Clary sabe que deve chamar a polícia, mas é difícil explicar um assassinato quando o corpo desaparece no ar e os assassinos são invisíveis para todos, menos para ela. Tão surpresa quanto assustada, Clary aceita ouvir o que eles têm a dizer...
                                    </p>
                                    <p>
                                        E assim começa sua jornada ao lado dos Caçadores de Sombras.
                                    </p>
                                </div>
                            </section>

                            <section>
                                <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">Sobre a Autora</h3>
                                <div className="flex flex-col sm:flex-row items-start gap-6 bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                                    <img src="https://placehold.co/150x150/e5e7eb/6b7280?text=Foto" alt="Cassandra Clare" className="w-24 h-24 rounded-full object-cover border-2 border-gray-200" />
                                    <div>
                                        <h4 className="text-lg font-bold text-gray-900">Cassandra Clare</h4>
                                        <p className="text-sm text-gray-600 mb-3 italic">Autora Best-seller</p>
                                        <p className="text-gray-700 text-sm leading-relaxed">
                                            Filha de um casal de norte-americanos, Cassandra Clare nasceu no Irã e passou a maior parte da infância viajando com a família. Antes dos dez anos já tinha vivido na França, na Inglaterra e na Suíça.
                                        </p>
                                    </div>
                                </div>
                            </section>
                        </div>

                        <aside className="lg:col-span-4 space-y-8">

                            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                                <h3 className="font-bold text-gray-900 mb-4 uppercase text-sm tracking-wider">Classificação</h3>

                                <div className="mb-6">
                                    <h4 className="text-sm font-semibold text-gray-600 mb-2">Gêneros</h4>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-600">Fantasia</span>
                                        <span className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-600">Jovem Adulto</span>
                                        <span className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-600">Romance Paranormal</span>
                                        <span className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-600">Aventura</span>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-semibold text-gray-600 mb-2">Subject (Assuntos)</h4>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-2 py-1 bg-gray-200 rounded text-xs text-gray-700">Magia</span>
                                        <span className="px-2 py-1 bg-gray-200 rounded text-xs text-gray-700">Demônios</span>
                                        <span className="px-2 py-1 bg-gray-200 rounded text-xs text-gray-700">Nova York</span>
                                    </div>
                                </div>
                            </div>

                            <div className="border-l-4 border-yellow-400 pl-4 py-1">
                                <h3 className="font-bold text-gray-900 mb-3">Nominações e Prêmios</h3>
                                <ul className="space-y-2 text-sm text-gray-700">
                                    <li className="flex items-start gap-2">
                                        <span>🏆</span>
                                        <span>Locus Award for Best First Novel (Nominee)</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span>🏆</span>
                                        <span>Georgia Peach Book Award (Honor)</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span>⭐</span>
                                        <span>Abraham Lincoln Award (Nominee)</span>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-bold text-gray-900 mb-3 pb-2 border-b">Detalhes do Universo</h3>

                                <div className="mb-4">
                                    <span className="block text-xs text-gray-500 uppercase font-bold mb-1">Idioma Original</span>
                                    <p className="text-gray-800">Inglês</p>
                                </div>

                                <div className="mb-4">
                                    <span className="block text-xs text-gray-500 uppercase font-bold mb-2">Personagens Principais</span>
                                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                                        <li>Clary Fray</li>
                                        <li>Jace Wayland</li>
                                        <li>Alec Lightwood</li>
                                        <li>Isabelle Lightwood</li>
                                        <li>Simon Lewis</li>
                                    </ul>
                                </div>
                            </div>

                        </aside>
                    </div>

                    <section className="mt-16 pt-10 border-t border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Livros Relacionados</h2>

                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                            <div className="group cursor-pointer">
                                <div className="bg-gray-200 aspect-[2/3] rounded-md mb-3 overflow-hidden">
                                    <img src="https://placehold.co/200x300/e5e7eb/9ca3af?text=Livro+2" className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                                </div>
                                <h4 className="font-bold text-gray-900 text-sm leading-tight group-hover:text-blue-600">Cidade das Cinzas</h4>
                                <p className="text-xs text-gray-500 mt-1">Vol. 2</p>
                            </div>

                            <div className="group cursor-pointer">
                                <div className="bg-gray-200 aspect-[2/3] rounded-md mb-3 overflow-hidden">
                                    <img src="https://placehold.co/200x300/e5e7eb/9ca3af?text=Livro+3" className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                                </div>
                                <h4 className="font-bold text-gray-900 text-sm leading-tight group-hover:text-blue-600">Cidade de Vidro</h4>
                                <p className="text-xs text-gray-500 mt-1">Vol. 3</p>
                            </div>

                            <div className="group cursor-pointer">
                                <div className="bg-gray-200 aspect-[2/3] rounded-md mb-3 overflow-hidden">
                                    <img src="https://placehold.co/200x300/e5e7eb/9ca3af?text=Livro+4" className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                                </div>
                                <h4 className="font-bold text-gray-900 text-sm leading-tight group-hover:text-blue-600">Cidade dos Anjos Caídos</h4>
                                <p className="text-xs text-gray-500 mt-1">Vol. 4</p>
                            </div>

                            <div className="group cursor-pointer">
                                <div className="bg-gray-200 aspect-[2/3] rounded-md mb-3 overflow-hidden">
                                    <img src="https://placehold.co/200x300/e5e7eb/9ca3af?text=Livro+5" className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                                </div>
                                <h4 className="font-bold text-gray-900 text-sm leading-tight group-hover:text-blue-600">Cidade das Almas Perdidas</h4>
                                <p className="text-xs text-gray-500 mt-1">Vol. 5</p>
                            </div>
                            <div className="group cursor-pointer hidden lg:block">
                                <div className="bg-gray-200 aspect-[2/3] rounded-md mb-3 overflow-hidden">
                                    <img src="https://placehold.co/200x300/e5e7eb/9ca3af?text=Outra+Série" className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                                </div>
                                <h4 className="font-bold text-gray-900 text-sm leading-tight group-hover:text-blue-600">Anjo Mecânico</h4>
                                <p className="text-xs text-gray-500 mt-1">Peças Infernais</p>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    )
}