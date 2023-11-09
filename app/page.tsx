"use client";
import { Results } from "@/components/Home/Results";
import { SearchIcon } from "@/components/Icons/SearchIcon";
import { LoadingResults } from "@/components/Layout/LoadingResults";
import { api } from "@/config/api";
import { Book } from "@/models/Book";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Home() {
  const [data, setData] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit } = useForm<{ search: string }>();

  const onSubmit = async (data: { search: string }) => {
    setIsLoading(true);
    const { data: res } = await api.get<Book[]>("/search", {
      params: { query: data.search },
    });
    setData(res);
    setIsLoading(false);
  };

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
            {...register("search")}
          />
        </div>
        <button
          type="submit"
          className="py-2 transition-all duration-100 ease-in-out flex gap-4 items-center self-end px-5 rounded-full text-center bg-emerald-400 text-white hover:bg-emerald-600 hover:scale-105 trasnform active:scale-95"
        >
          {isLoading ? (
            <div className="animate-spin h-6 w-6 aspect-square rounded-full border-l border-t border-white" />
          ) : (
            <SearchIcon isLoading={isLoading} />
          )}
          Pesquisar
        </button>
      </form>
      <hr className="border-emerald-500 my-7" />
      <Results books={data} isLoading={isLoading} />
    </>
  );
}
