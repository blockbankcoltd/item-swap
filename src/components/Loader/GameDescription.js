import React from "react";
import ContentLoader from "react-content-loader";

const ItemDescription = (props) => (
  <ContentLoader
    speed={2}
    width={800}
    height={100}
    viewBox="0 0 800 100"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="5" y="21" rx="9" ry="9" width="790" height="11" />
    <rect x="5" y="40" rx="9" ry="9" width="790" height="11" />
    <rect x="5" y="60" rx="9" ry="9" width="790" height="11" />
    <rect x="6" y="80" rx="9" ry="9" width="530" height="11" />
  </ContentLoader>
);

export default ItemDescription;
