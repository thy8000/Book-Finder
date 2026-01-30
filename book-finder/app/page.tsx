import type { Metadata } from "next";

import { Header, HeroHeadline } from "./components";

export const metadata: Metadata = {
  title: "Book Finder | Encontre seu próximo livro por título ou autor",
  description:
    "Explore milhares de obras com o Book Finder. Pesquise por título, autor ou assunto e acesse detalhes completos, capas e datas de publicação em tempo real.",
};

export default function Home() {
  return (
    <div>
      <main className="flex flex-col gap-4">
        <Header />
        <HeroHeadline
          title="Encontre seu próximo livro"
          description="Explore milhares de obras e descubra sua próxima leitura favorita"
        />
      </main>
    </div>
  );
}
