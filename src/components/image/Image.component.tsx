import React from "react";

type ImageProps = {
  path: string;
  alt: string;
  style?: object;
  onClick?: any;
};
const Image = ({ path, alt, onClick, style }: ImageProps) => (
  <div onClick={onClick}>
    <img
      src={path}
      alt={alt}
      style={{ ...style }}
    />
  </div>
);

export default Image;
