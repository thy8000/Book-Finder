import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const apiKey = process.env.GOOGLE_BOOKS_API_KEY || "";
    const apiUrl = "https://www.googleapis.com/books/v1/";

    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q");

    if (!query) {
        return NextResponse.json(
            { error: "Parâmetro 'q' é obrigatório" },
            { status: 400 }
        );
    }

    try {
        const url = new URL("volumes", apiUrl);
        url.searchParams.append("q", query);
        url.searchParams.append("key", apiKey);

        const response = await fetch(url.toString(), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                { error: data.error?.message || "Erro ao buscar livros" },
                { status: response.status }
            );
        }

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        const errorMessage =
            error instanceof Error
                ? error.message
                : "Erro desconhecido ao buscar livros";
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
