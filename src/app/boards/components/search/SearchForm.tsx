import React from "react";
import SearchInput from "./SearchInput";
import Button from "../Button";

function SearchForm() {
  return (
    <form className="flex w-full items-center gap-[15px]">
      <SearchInput />
      <Button>검색</Button>
    </form>
  );
}

export default SearchForm;
