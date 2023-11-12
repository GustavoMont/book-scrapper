import React from "react";
import { Td } from "../Layout/Table/Td";
import { Book } from "@/models/Book";
import { v4 } from "uuid";
import { handlePrice } from "@/utils/format-price";

type Props = {
  books: Book[];
};

export const ResultsTable: React.FC<Props> = ({ books }) => {
  return (
    <table className="border-collapse border border-slate-500 w-[98%]">
      <thead>
        <tr className="bg-emerald-500 text-white rounded-lg">
          <Td as="th">Título do Livro</Td>
          <Td as="th">Preço</Td>
          <Td as="th">Loja</Td>
          <Td as="th">Link</Td>
        </tr>
      </thead>
      <tbody>
        {books.map((book, i) => (
          <tr
            className="hover:bg-emerald-200 transition-all ease-in-out duration-150 "
            key={v4()}
          >
            <Td>{book.title}</Td>
            <Td dataType="number">{handlePrice(book.price)}</Td>
            <Td>{book.siteName}</Td>
            <Td>
              <a
                target="_blank"
                className="transition-all duration-150 ease-in-out hover:text-emerald-500 text-emerald-600 underline"
                href={book.link}
              >
                Acessar
              </a>
            </Td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
