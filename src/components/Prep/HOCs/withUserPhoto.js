import React from "react";

export const withUserPhoto = (Component) => {
  return (props) => {
    return <Component {...props} />;
  };
};
