import React from "react";
import { css } from "@linaria/core";

import { TextField, InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const searchRoot = css`
  width: 100%;
  padding-top: 50px;
`;

const searchStyle = css`
  background: #fdfcfc;
  box-shadow: 5px 5px 80px rgba(212, 173, 134, 0.122623);
  border-radius: 10px;
  padding: 17px 0;
  height: 46px;
`;

const icon = css`
  padding-left: 19px;
  font-size: 16px !important;

  @media (min-width: 768px) {
    font-size: 24px !important;
  }
`;

interface SearchProps {
  search: string | null;
  setSearch: (search: string) => void;
}

const Search: React.FC<SearchProps> = ({ search, setSearch }) => {
  return (
    <TextField
      value={search}
      onChange={({ target: { value } }) => setSearch(value)}
      type="search"
      classes={{ root: searchRoot }}
      InputProps={{
        className: searchStyle,
        disableUnderline: true,
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon classes={{ root: icon }} />
          </InputAdornment>
        ),
      }}
      placeholder="Search book"
    />
  );
};

export default Search;
