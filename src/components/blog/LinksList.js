import React from "react";
import { withStyles } from "@material-ui/core";
import Link from "../buttons/extension";
import styles from "./styles/LinksList";

const LinksList = ({ classes, links }) => (
  <ul className={classes.PagesList}>
    {links.map(({ name, href }) => (
      <li key={name}>
        <Link className={classes.ListLink} to={href}>
          {name}
        </Link>
      </li>
    ))}
  </ul>
);

export default withStyles(styles)(LinksList);
