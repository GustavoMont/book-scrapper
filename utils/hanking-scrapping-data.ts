import { Book } from "@/models/Book";

export const hankingBookByPrice = (book1: Book, book2: Book) => {
  return book1.price - book2.price;
};
