import React from "react";
import styles from "./style.module.scss";

interface AvatarProps {
  className?: string;
  style?: object;
  image: string;
  alt: string;
  width?: number;
  height?: number;
}

const Avatar: React.FC<AvatarProps> = ({
  className,
  style,
  image,
  alt,
  width,
  height,
}) => {
  return (
    <div className={`${styles.avatar} ${className}`} style={style}>
      <img src={image} alt={alt} style={{ width: width, height: height }} />
    </div>
  );
};

export default Avatar;
