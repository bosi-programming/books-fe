import React from "react";
import { css } from "@linaria/core";

const paper = (background: string) => css`
  background: ${background};
  box-shadow: 2px 4px 48px rgba(154, 175, 209, 0.62134);
  border-radius: 5px;
`;

const title = css`
  font-family: Playfair Display;
  font-style: normal;
  font-weight: bold;
  font-size: 27px;
  line-height: 36px;
  letter-spacing: 2px;
  color: #fefefe;
`;

const authorStyle = css`
  font-family: SFProDisplay;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 1.28889px;
  color: #e7e7e1;
`;

const ratignStyle = css`
  font-family: SF Pro Display;
  font-style: normal;
  font-weight: bold;
  font-size: 10px;
  line-height: 12px;
  letter-spacing: 0.020635px;
  color: #e7e7e1;
`;

const imageStyle = css`
  max-width: 72px;
  height: auto;
`;

interface DiscoveryCardProps {
  background: string;
  volumeInfo: {
    title: string;
    authors: string[];
  };
  ratignsCount: number;
  image: string;
}

const DiscoveryCard: React.FC<DiscoveryCardProps> = ({
  background,
  volumeInfo,
  ratignsCount,
  image,
}) => (
  <div className={paper(background)}>
    <div>
      <h2 className={title}>{volumeInfo.title}</h2>
      {volumeInfo.authors.forEach((author) => (
        <p className={authorStyle}>{author}</p>
      ))}
      <p className={ratignStyle}><strong>{ratignsCount}</strong> Read Now</p>
    </div>
    <img src={image} alt={volumeInfo.title} className={imageStyle} />
  </div>
);

export default DiscoveryCard;
