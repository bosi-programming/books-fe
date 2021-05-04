import React from "react";
import { css } from "@linaria/core";

import { TextField, InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const search = css`
  background: #fdfcfc;
  box-shadow: 5px 5px 80px rgba(212, 173, 134, 0.122623);
  border-radius: 10px;
  padding: 17px 0;
  height: 46px;

  @media (min-width: 768px) {
    max-width: 400px;
  }
`;

const icon = css`
  padding-left: 19px;
  font-size: 16px !important;

  @media (min-width: 768px) {
    font-size: 24px !important;
  }
`;

const Search = () => {
  return (
    <TextField
      type="search"
      InputProps={{
        className: search,
        disableUnderline: true,
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon classes={{ root: icon }} />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default Search;
