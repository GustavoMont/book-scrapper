import React from "react";
import { BookIcon } from "../Icons/BookIcon";

export const Navbar = () => {
  return (
    <nav className="p-4 bg-emerald-400">
      <div className="flex gap-3 text-white justify-center items-center">
        <BookIcon className="w-10 h-10" />
        <h1 className="text-2xl font-bold">BookScrapper.JS</h1>
      </div>
    </nav>
  );
};
