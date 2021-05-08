import React from "react";
import { useHistory } from "react-router-dom";
import { css } from "@linaria/core";

const wrapperStyle = css`
  cursor: pointer;
`;

const imageStyle = css`
  max-width: 105px;
  height: auto;
`;

const titleStyle = css`
  color: rgba(49, 49, 49, 0.8);
  font-family: SF Pro Display;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 14px;
`;

const authorStyle = css`
  font-family: Roboto;
  font-style: normal;
  font-weight: 900;
  font-size: 10px;
  line-height: 12px;
  color: rgba(49, 49, 49, 0.8);
`;

interface SingleBookProps {
  id: string;
  isAppBook?: boolean;
  image: string;
  title: string;
  authors: string[];
}

const SingleBook: React.FC<SingleBookProps> = ({
  id,
  isAppBook,
  image,
  title,
  authors,
}) => {
  const history = useHistory();
  return (
    <div
      className={wrapperStyle}
      onClick={() =>
        history.push(isAppBook ? `/details/${id}` : `/details/google/${id}`)
      }
    >
      <img src={image} alt={title} className={imageStyle} />
      <h2 className={titleStyle}>{title}</h2>
      {authors && <p className={authorStyle}>by {authors.toString()}</p>}
    </div>
  );
};

export default SingleBook;
