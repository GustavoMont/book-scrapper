import { Book } from "@/models/Book";

export const filterBooksByTitle = (book: Book, search: string) => {
  return book.title.toLowerCase().includes(search.toLowerCase());
};

export const filterBooksByPrice = (book: Book) => {
  return book.price > 0;
};
