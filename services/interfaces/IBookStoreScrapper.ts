import { Book } from "@/models/Book";

export interface IBookStoreScrapper {
  url: string;
  search(search: string): Promise<string>;
  getBooks(html: string): Promise<Book[]>;
}
