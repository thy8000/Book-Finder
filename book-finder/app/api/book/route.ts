import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const apiKey = process.env.GOOGLE_BOOKS_API_KEY || "";
    const apiUrl = process.env.GOOGLE_BOOKS_API_URL || "";

    const searchParams = request.nextUrl.searchParams;
    const volumeId = searchParams.get("book");

    if (!volumeId) {
        return NextResponse.json(
            { error: "Parâmetro 'book' é obrigatório" },
            { status: 400 }
        );
    }

    try {
        const url = new URL(`volumes/${volumeId}`, apiUrl);
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
                { error: data.error?.message || "Erro ao buscar livro" },
                { status: response.status }
            );
        }

        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        const errorMessage =
            error instanceof Error
                ? error.message
                : "Erro desconhecido ao buscar livro";
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}