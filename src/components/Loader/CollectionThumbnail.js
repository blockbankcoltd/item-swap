import React from "react";
import ContentLoader from "react-content-loader";

const CollectionThumbnail = (props) => {
  const theme = localStorage.getItem("theme");
  return (
    <ContentLoader
      speed={2}
      width={500}
      height={500}
      viewBox="0 0 500 500"
      backgroundColor={theme === "light" ? "#f3f3f3" : "#858585"}
      foregroundColor={theme === "light" ? "#ecebeb" : "#595959"}
      {...props}
    >
      <rect x="6" y="23" rx="30" ry="30" width="230" height="230" />
      <rect x="259" y="23" rx="30" ry="30" width="230" height="230" />
      <rect x="6" y="273" rx="30" ry="30" width="230" height="230" />
      <rect x="259" y="273" rx="30" ry="30" width="230" height="230" />
    </ContentLoader>
  );
};

export default CollectionThumbnail;
