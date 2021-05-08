import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { css } from "@linaria/core";

import constants from "../constants";
import SingleBook from "../components/SingleBook";
import Search from "../components/Search";

const container = css`
  height: calc(100vh - 110px);
  overflow-y: auto;
  padding-top: 50px;
  padding-left: 20px;
  padding-right: 20px;
  @media (min-width: 768px) {
    padding-left: 5vw;
    padding-right: 5vw;
  }
`;

const titleStyle = css`
  font-family: SF Pro Display;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 29px;
  color: #54565a;
`;

const titleColor = css`
  color: #ff6978;
  text-transform: capitalize;
`;

const booksGrid = css`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 16px;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-column-gap: 5vw;
  }
`;

const Home = () => {
  const token = localStorage.getItem("token");
  const history = useHistory();
  const [userName, setUserName] = useState("");
  const [search, setSearch] = useState("");
  const [googleBooks, setGoogleBooks] = useState<any>([]);
  const [appBooks, setAppBooks] = useState<any>([]);

  useEffect(() => {
    fetch(`${constants.baseUrl}/users`, {
      headers: token ? { "x-access-token": token } : {},
    })
      .then((res) => res.json())
      .then((data) => {
        setUserName(data.user);
      })
      .catch(() => {
        if (history) {
          history.push("/login");
        }
      });
  }, [history, token]);

  useEffect(() => {
    if (search) {
      fetch(`${constants.baseUrl}/book?title=${search}`, {
        headers: token ? { "x-access-token": token } : {},
      })
        .then((res) => res.json())
        .then((data) => {
          setGoogleBooks(data.books[0]);
          setAppBooks(data.books[1]);
        })
        .catch(() => {});
    } else {
      fetch(`${constants.baseUrl}/book`, {
        headers: token ? { "x-access-token": token } : {},
      })
        .then((res) => res.json())
        .then((data) => {
          setGoogleBooks(data.books[0]);
          setAppBooks(data.books[1]);
        })
        .catch(() => {});
    }
  }, [search, token]);

  return (
    <div className={container}>
      <Search search={search} setSearch={setSearch} />
      <h2 className={titleStyle}>
        Hi, <span className={titleColor}>{userName}</span> 👋
      </h2>
      <div className={booksGrid}>
        {appBooks.map((book: any) => (
          <SingleBook
            id={book._id}
            isAppBook
            title={book.title}
            authors={book.authors}
            image="https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"
          />
        ))}
        {googleBooks.map((book: any) => (
          <SingleBook
            id={book.id}
            title={book.volumeInfo.title}
            authors={book.volumeInfo.authors}
            image={book.volumeInfo.imageLinks.smallThumbnail}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
