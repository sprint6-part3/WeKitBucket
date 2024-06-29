"use client";

import React from "react";
import SearchInput from "./SearchInput";
import Button from "../Button";

interface SearchFormProps {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value?: string;
}

function SearchForm({ onSubmit, onChange, value, ...rest }: SearchFormProps) {
  return (
    <form className="flex w-full items-center gap-[15px]" onSubmit={onSubmit} {...rest}>
      <SearchInput onChange={onChange} value={value} />
      <Button variants="sm">검색</Button>
    </form>
  );
}

export default SearchForm;
