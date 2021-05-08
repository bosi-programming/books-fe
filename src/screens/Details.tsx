import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { css } from "@linaria/core";

import constants from "../constants";

const container = css`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  font-weight: bold;
  font-size: 24px;
  line-height: 29px;
  letter-spacing: 1.5px;
  color: #36383a;
`;

const authorStyle = css`
  font-family: SFProDisplay;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 0.670588px;
  color: #ff6978;
`;

const descriptionStyle = css`
  font-family: SFProText;
  font-size: 14px;
  line-height: 25px;
  letter-spacing: 0.2px;
`;

interface DetailsProps {
  isAppBook: boolean;
}

const Details: React.FC<DetailsProps> = ({ isAppBook }) => {
  const token = localStorage.getItem("token");
  const { id } = useParams<any>();
  const [book, setBook] = useState<any>();

  useEffect(() => {
    fetch(`${constants.baseUrl}/book/${isAppBook ? `${id}` : `google/${id}`}`, {
      headers: token ? { "x-access-token": token } : {},
    })
      .then((res) => res.json())
      .then((data) => {
        setBook(data);
      })
      .catch(() => {});
  }, [isAppBook, token, id]);

  if (!book) {
    return <div />;
  }

  return (
    <div className={container}>
      <img
        src={
          isAppBook
            ? "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"
            : book.volumeInfo.imageLinks.thumbnail
        }
        alt={isAppBook ? book.title : book.volumeInfo.title}
      />
      <h1 className={titleStyle}>
        {isAppBook ? book.title : book.volumeInfo.title}
      </h1>
      {book.author ||
        (book.volumeInfo.authors && (
          <h2 className={authorStyle}>
            {isAppBook ? book.author : book.volumeInfo.authors.toString()}
          </h2>
        ))}
      {book.description ||
        (book.volumeInfo.description && (
          <p className={descriptionStyle}>
            {isAppBook ? book.description : book.volumeInfo.description}
          </p>
        ))}
    </div>
  );
};

export default Details;
