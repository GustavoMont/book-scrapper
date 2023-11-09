import { Book } from "@/models/Book";
import { IBookStoreScrapper } from "./interfaces/IBookStoreScrapper";
import { scrapper } from "@/config/api";
import * as cheerio from "cheerio";
import {
  filterBooksByPrice,
  filterBooksByTitle,
} from "@/utils/validate-scrap-data";

export class LeituraScrapper implements IBookStoreScrapper {
  url: string = "https://leitura.com.br/index.php";
  async getHtml(search: string) {
    const { data: html } = await scrapper.get<string>(this.url, {
      params: { route: "product/search", search },
    });
    return html;
  }
  async getBooks(search: string): Promise<Book[]> {
    const html = await this.getHtml(search);
    const $ = cheerio.load(html);
    const books: Book[] = [];
    $("div.product-thumb").each((i, el) => {
      const title = $(el).find("h4").text();
      const link = $(el).find("h4 a").attr("href") ?? "";
      let priceText = $(el).find("span.price-new").text();
      if (!priceText) {
        priceText = $(el).find("p.price").text();
      }
      priceText = priceText.split("R$")[1];

      const price = Number(priceText.replace(",", "."));
      const book: Book = { title, price, link, siteName: "Leitura" };
      books.push(book);
    });
    return books
      .filter(filterBooksByPrice)
      .filter((book) => filterBooksByTitle(book, search));
  }
}
