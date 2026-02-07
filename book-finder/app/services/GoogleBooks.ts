export class GoogleBooksService {
  async getBooks(query: string): Promise<{ data: any; status: number }> {
    try {
      const url = new URL("api/books", window.location.origin);
      url.searchParams.append("q", query);

      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 404) {
          return { data: null, status: 404 };
        }
        return { data: { error: data.error || "Erro ao buscar livros" }, status: response.status };
      }

      if (!data.items || data.items.length === 0) {
        return { data: null, status: 404 };
      }

      return { data, status: 200 };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erro desconhecido ao buscar livros";
      return { data: { error: errorMessage }, status: 500 };
    }
  }

  async getBook(bookId: string): Promise<{ data: any; status: number }> {
    try {
      const url = new URL("api/book", window.location.origin);
      url.searchParams.append("book", bookId);

      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return { data: { error: data.error || "Erro ao buscar livro" }, status: response.status };
      }

      return { data, status: 200 };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erro desconhecido ao buscar livro";
      return { data: { error: errorMessage }, status: 500 };
    }
  }


}
