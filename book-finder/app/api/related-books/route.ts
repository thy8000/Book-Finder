import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const apiKey = process.env.GOOGLE_BOOKS_API_KEY || "";
    const apiUrl = process.env.GOOGLE_BOOKS_API_URL || "";

    try {
        const { author } = await request.json();

        if (!Array.isArray(author) || author.length === 0) {
            return NextResponse.json(
                { error: "Author must be an array and not empty" },
                { status: 400 }
            );
        }

        const authorQuery = author?.length
            ? author.map((author: string) => `inauthor:${author}`).join("+")
            : "";

        const query = `${authorQuery ? "+" + authorQuery : ""}`;

        const url = new URL("volumes", apiUrl);
        url.searchParams.append("q", query);
        url.searchParams.append("maxResults", "6");
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
                { error: data.error?.message || "Erro ao buscar livros relacionados" },
                { status: response.status }
            );
        }

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        const errorMessage =
            error instanceof Error
                ? error.message
                : "Erro desconhecido ao buscar livros relacionados";
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}