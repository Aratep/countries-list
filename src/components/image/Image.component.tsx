import React from "react";

type ImageProps = {
  path: string;
  alt: string;
  style?: object;
  onClick?: any;
  className?: string;
};
const Image = ({ path, alt, onClick, style, className }: ImageProps) => (
  <div onClick={onClick}>
    <img
      src={path}
      alt={alt}
      style={{ ...style }}
      className={className}
    />
  </div>
);

export default Image;
