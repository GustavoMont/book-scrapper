"use client";
import { Results } from "@/components/Home/Results";
import { SearchIcon } from "@/components/Icons/SearchIcon";
import { XIcon } from "@/components/Icons/XIcon";
import { Button } from "@/components/common/Button";
import { api } from "@/config/api";
import { Book } from "@/models/Book";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const book = searchParams.get("book");
  const hasSearch = searchParams.has("book");
  const [data, setData] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit } = useForm<{ search: string }>({
    defaultValues: {
      search: book ?? "",
    },
  });

  const getBooks = async (search: string) => {
    const { data: books } = await api.get<Book[]>("/search", {
      params: { query: search },
    });
    return books;
  };

  const onSubmit = async ({ search }: { search: string }) => {
    setIsLoading(true);

    const params = new URLSearchParams(searchParams);
    params.set("book", search);

    router.replace(`/?${params.toString()}`);

    setIsLoading(false);
  };

  const onClearSearch = () => {
    router.replace("/");
  };

  useEffect(() => {
    if (book) {
      setIsLoading(true);
      getBooks(book)
        .then((books) => {
          setData(books);
        })
        .finally(() => setIsLoading(false));
    }
  }, [book]);

  return (
    <>
      <h2 className="text-center text-4xl text-emerald-500 font-medium mb-10">
        Faça sua pesquisa!
      </h2>
      <form
        className="flex gap-5 justify-center w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-1 w-full max-w-xl">
          <label htmlFor="search">
            <p>Livro:</p>
          </label>
          <input
            className="rounded-md focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500 "
            type="text"
            {...register("search", {
              required: "Pesquise algum livro",
            })}
          />
        </div>
        <Button
          icon={<SearchIcon isLoading={isLoading} />}
          isLoading={isLoading}
        >
          Pesquisar
        </Button>

        {hasSearch ? (
          <Button
            onClick={onClearSearch}
            type="reset"
            icon={<XIcon />}
            color="danger"
          >
            Limpar pesquisa
          </Button>
        ) : null}
      </form>
      <hr className="border-emerald-500 my-7" />
      <Results
        clearSearch={() => {}}
        hasNoSearch
        books={data}
        isLoading={isLoading}
      />
    </>
  );
}
