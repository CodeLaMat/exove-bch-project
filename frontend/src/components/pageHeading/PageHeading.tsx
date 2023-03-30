import React from "react";
import classes from "./PageHeading.module.css";

interface Iprops {
  pageTitle: string;
}
const PageHeading = (props: Iprops) => {
  return (
    <div className={classes.pageHeading}>
      <h2>{props.pageTitle}</h2>
    </div>
  );
};

export default PageHeading;
