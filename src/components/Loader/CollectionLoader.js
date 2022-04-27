import React from "react";
import ContentLoader from "react-content-loader";

const CollectionLoader = (props) => (
  <ContentLoader
    speed={2}
    width={450}
    height={490}
    viewBox="0 0 450 490"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="9" y="12" rx="4" ry="4" width="47" height="47" />
    <rect x="65" y="12" rx="2" ry="2" width="79" height="14" />
    <rect x="64" y="34" rx="1" ry="1" width="103" height="22" />
    <rect x="241" y="11" rx="2" ry="2" width="66" height="21" />
    <rect x="7" y="85" rx="10" ry="10" width="297" height="269" />
    <rect x="9" y="416" rx="2" ry="2" width="147" height="29" />
  </ContentLoader>
);

export default CollectionLoader;
