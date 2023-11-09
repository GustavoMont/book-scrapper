import { AxiosError } from "axios";
import { NextRequest } from "next/server";
import { AmazonScrapper } from "@/services/AmazonScrapper";
import { LeituraScrapper } from "@/services/LeituraScrapper";
import { hankingBookByPrice } from "@/utils/hanking-scrapping-data";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");
  if (!query) {
    throw new Error("Nenhuma pesquisa feita");
  }
  try {
    const amazonScrapper = new AmazonScrapper();
    const amazonBooks = await amazonScrapper.getBooks(query);
    const leituraScrapper = new LeituraScrapper();
    const leituraBooks = await leituraScrapper.getBooks(query);
    const allBoooks = amazonBooks.concat(leituraBooks);
    const results = allBoooks.sort(hankingBookByPrice);

    return Response.json(results);
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.status);
    }

    return Response.json({ hello: query ?? "world" });
  }
}
