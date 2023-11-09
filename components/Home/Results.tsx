import React from "react";
import { LoadingResults } from "../Layout/LoadingResults";
import { Book } from "@/models/Book";
import { Td } from "../Layout/Table/Td";
import { v4 } from "uuid";

interface Props {
  isLoading?: boolean;
  books: Book[];
}

export const Results: React.FC<Props> = ({ isLoading, books = [] }) => {
  const handlePrice = (price: number | null) => {
    return (
      price?.toLocaleString("pt-BR", {
        currency: "BRL",
        style: "currency",
      }) ?? "Não encontrado"
    );
  };
  return (
    <section className="flex flex-col gap-4">
      <h3 className="text-2xl text-emerald-500">Resultados</h3>
      <div className="flex-1 max-h-[50vh] overflow-y-auto">
        {true ? (
          <LoadingResults />
        ) : (
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
        )}
      </div>
    </section>
  );
};
