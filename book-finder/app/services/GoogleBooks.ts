export class GoogleBooksService {
  private readonly apiUrl: string = "https://www.googleapis.com/books/v1/";

  private async makeRequest(endpoint: string, params?: Record<string, string>): Promise<Response> {
    const url = new URL(endpoint, this.apiUrl);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    url.searchParams.append("key", process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY || "");

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  }

  async getBooks(query: string): Promise<{ data: any; status: number }> {
    try {
      const response = await this.makeRequest("volumes", { q: query });
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
