export class GoogleBooksService {
  private readonly apiUrl: string = "/api/books";

  async getBooks(query: string): Promise<{ data: any; status: number }> {
    try {
      const url = new URL(this.apiUrl, window.location.origin);
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
        return { data: { error: data.error?.message || "Erro ao buscar livros" }, status: response.status };
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
}
