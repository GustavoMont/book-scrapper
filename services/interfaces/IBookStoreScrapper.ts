import { Book } from "@/models/Book";

export interface IBookStoreScrapper {
  url: string;
  getBooks(search: string): Promise<Book[]>;
}
