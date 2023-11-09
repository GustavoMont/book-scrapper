import { Book } from "@/models/Book";
import { IBookStoreScrapper } from "./interfaces/IBookStoreScrapper";
import { scrapper } from "@/config/api";
import * as cheerio from "cheerio";
import {
  filterBooksByPrice,
  filterBooksByTitle,
} from "@/utils/validate-scrap-data";

export class AmazonScrapper implements IBookStoreScrapper {
  url: string = "https://www.amazon.com.br";
  async search(search: string): Promise<string> {
    const { data } = await scrapper.get<string>(`${this.url}/s`, {
      params: { k: search, i: "stripbooks" },
    });
    return data;
  }
  async getBooks(search: string): Promise<Book[]> {
    const html = await this.search(search);
    const $ = cheerio.load(html);

    const books: Book[] = [];
    $("div.puis-card-container").each((_, el) => {
      const title = $(el).find("h2").text();
      const link = this.url + $(el).find("h2 a").attr("href") ?? "";
      const priceText = $(el)
        .find(`.a-row span.a-price > span.a-offscreen`)
        .first()
        .text();
      const priceValue = priceText.replace("R$", "").replace(",", ".");

      const price = Number(priceValue);

      const data: Book = { title, price, siteName: "Amazon", link };
      books.push(data);
    });

    return books
      .filter(filterBooksByPrice)

      .filter((book) => filterBooksByTitle(book, search));
  }
}
