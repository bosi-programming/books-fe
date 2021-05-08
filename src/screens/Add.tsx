import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { css } from "@linaria/core";

import { TextField, Button } from "@material-ui/core";

import constants from "../constants";

const formStyle = css`
  width: 200px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  height: calc(100vh - 60px);
`;

const textFieldStyle = css`
  background: #fdfcfc;
  box-shadow: 5px 5px 80px rgba(212, 173, 134, 0.4926);
  border-radius: 10px;
  margin-bottom: 16px !important;
`;

const buttonStyle = css`
  width: 100%;
  margin-bottom: 16px !important;
`;

const labelStyle = css`
  font-family: SFProText;
  font-size: 16px;
  line-height: 18px;
  color: #000000;
`;

const Add = () => {
  const token = localStorage.getItem("token");
  const history = useHistory();
  const [name, setName] = useState<string | undefined>();
  const [author, setAuthor] = useState<string | undefined>();
  const [description, setDescription] = useState<string | undefined>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dataToSend = {
      title: name,
      author,
      description,
    };
    if (token) {
      fetch(`${constants.baseUrl}/book`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify(dataToSend),
      })
        .then((res) => res.json())
        .then((data) => {
          history.goBack();
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <form className={formStyle} onSubmit={handleSubmit}>
      <h2 className={labelStyle}>Name</h2>
      <TextField
        className={textFieldStyle}
        variant="outlined"
        value={name}
        onChange={({ target: { value } }) => setName(value)}
        placeholder="Book title"
        required
      />
      <h2 className={labelStyle}>Authors</h2>
      <TextField
        className={textFieldStyle}
        type="author"
        variant="outlined"
        value={author}
        onChange={({ target: { value } }) => setAuthor(value)}
        placeholder="author"
      />
      <h2 className={labelStyle}>Description</h2>
      <TextField
        className={textFieldStyle}
        type="description"
        variant="outlined"
        value={description}
        onChange={({ target: { value } }) => setDescription(value)}
        placeholder="description"
        multiline
        rows={4}
      />
      <Button
        classes={{ root: buttonStyle }}
        variant="contained"
        color="secondary"
        type="submit"
      >
        Add new book
      </Button>
    </form>
  );
};

export default Add;
