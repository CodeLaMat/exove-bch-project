import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./MenuItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

const navLinkStyles = ({ isActive }: { isActive: boolean }) => {
  return {
    fontWeight: isActive ? "bold" : "normal",
    textDecoration: "none",
    color: "#CCD2E3",
  };
};

interface Iprops {
  icon: IconDefinition;
  name: string;
  link: string;
  pageTitle: string;
}
const MenuItem = (props: Iprops) => {
  const { icon, name, link } = props;
  return (
    <div className={classes.menuItem}>
      <FontAwesomeIcon icon={icon}></FontAwesomeIcon>
      <span>
        <div>
          <NavLink to={link} style={navLinkStyles}>
            {name}
          </NavLink>
        </div>
      </span>
    </div>
  );
};

export default MenuItem;
