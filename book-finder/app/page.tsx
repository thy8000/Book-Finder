import type { Metadata } from "next";

import { Header, HeroHeadline, Search, Spinner, Card } from "./components";

export const metadata: Metadata = {
  title: "Book Finder | Encontre seu próximo livro por título ou autor",
  description:
    "Explore milhares de obras com o Book Finder. Pesquise por título, autor ou assunto e acesse detalhes completos, capas e datas de publicação em tempo real.",
};

export default function Home() {
  return (
    <div>
      <main className="flex flex-col gap-10">
        <Header />
        <HeroHeadline
          title="Encontre seu próximo livro"
          description="Explore milhares de obras e descubra sua próxima leitura favorita"
        />
        <Search
          id="search"
          placeholder="Pesquisar por título, autor ou assunto"
        />
      </main >
    </div >
  );
}
