import React from "react";
import { Link as LinkDom } from "react-router-dom";
import Link from "next/link";
import { isServer } from "../../apis/tools";

export default ({
  id,
  to,
  onClick,
  className,
  style,
  children,
  onMouseEnter,
  onMouseLeave,
}) => {
  return isServer ? (
    <Link href={to}>
      <a
        id={id}
        href={to}
        className={className}
        onClick={onClick}
        style={style}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {children}
      </a>
    </Link>
  ) : (
    <LinkDom
      id={id}
      to={to}
      className={className}
      onClick={onClick}
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </LinkDom>
  );
};
