import React from "react";
import { LoadingResults } from "../Layout/LoadingResults";
import { Book } from "@/models/Book";
import { useSearchParams } from "next/navigation";
import { ResultsTable } from "./ResultsTable";

interface Props {
  isLoading?: boolean;
  books: Book[];
  hasNoSearch: boolean;
  clearSearch(): void;
}

export const Results: React.FC<Props> = ({
  isLoading,
  books = [],
  hasNoSearch,
}) => {
  const searchParams = useSearchParams();
  const hasSearch = searchParams.has("book");
  return (
    <section className="flex h-[52vh] flex-col gap-4">
      <h3 className="text-2xl text-emerald-500">Resultados</h3>
      <div className="flex-1 h-full overflow-y-auto">
        <ViewHandler
          books={books}
          hasSearch={hasSearch}
          isLoading={isLoading}
        />
      </div>
    </section>
  );
};

type ViewHanlderProps = {
  isLoading?: boolean;
  hasSearch: boolean;
  books: Book[];
};

const ViewHandler = ({ books, hasSearch, isLoading }: ViewHanlderProps) => {
  if (isLoading) {
    return <LoadingResults />;
  } else if (!hasSearch) {
    return (
      <div className="text-emerald-400">
        <p>Pesquise por um título de livro</p>
      </div>
    );
  }
  return !!books.length ? (
    <ResultsTable books={books} />
  ) : (
    <div className="h-full text-center flex flex-col gap-1 justify-center items-center">
      <h3 className="text-emerald-500 text-2xl">Putz, Irmão! :(</h3>
      <p>Resultado não encontrado</p>
    </div>
  );
};
