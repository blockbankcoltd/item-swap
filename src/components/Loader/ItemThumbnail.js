import React from "react";
import ContentLoader from "react-content-loader";

const ItemThumbnail = (props) => {
  const theme = localStorage.getItem("theme");
  return (
    <ContentLoader
      speed={2}
      width={700}
      height={700}
      viewBox="0 0 700 700"
      backgroundColor={theme === "light" ? "#f3f3f3" : "#858585"}
      foregroundColor={theme === "light" ? "#ecebeb" : "#595959"}
      {...props}
    >
      <rect x="6" y="23" rx="30" ry="30" width="670" height="670" />
    </ContentLoader>
  );
};

export default ItemThumbnail;
