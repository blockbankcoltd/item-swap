import React from "react";
import ContentLoader from "react-content-loader";

const ItemLoader = (props) => (
  <ContentLoader
    speed={2}
    width={450}
    height={430}
    viewBox="0 0 450 430"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="9" y="12" rx="4" ry="4" width="41" height="41" />
    <rect x="56" y="12" rx="2" ry="2" width="66" height="12" />
    <rect x="58" y="31" rx="1" ry="1" width="91" height="19" />
    <rect x="204" y="11" rx="2" ry="2" width="55" height="18" />
    <rect x="7" y="76" rx="10" ry="10" width="261" height="237" />
    <rect x="9" y="339" rx="2" ry="2" width="129" height="25" />
    <rect x="10" y="388" rx="2" ry="2" width="69" height="8" />
    <rect x="10" y="403" rx="1" ry="1" width="42" height="17" />
    <rect x="192" y="375" rx="18" ry="18" width="78" height="41" />
  </ContentLoader>
);

export default ItemLoader;
