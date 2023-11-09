import { AxiosError } from "axios";
import { NextRequest } from "next/server";
import { AmazonScrapper } from "@/services/AmazonScrapper";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");
  if (!query) {
    throw new Error("Nenhuma pesquisa feita");
  }
  try {
    const amazonScrapper = new AmazonScrapper();
    const results = await amazonScrapper.getBooks(query);
    return Response.json(results);
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.status);
    }

    return Response.json({ hello: query ?? "world" });
  }
}
