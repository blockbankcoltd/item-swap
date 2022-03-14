import { useState } from "react";
import { useTokenPrice } from "react-moralis";
import { Link } from "react-router-dom";
function TokenPrice(props) {
  const { data: formattedData } = useTokenPrice(props);

  const [isUSDMode, setIsUSDMode] = useState(true);

  const toggleDisplayStyle = () => setIsUSDMode(!isUSDMode);

  const noLogoToken = "https://etherscan.io/images/main/empty-token.png";

  return (
    <Link className="sc-button header-slider style style-1 fl-button pri-1 d-flex align-items-center mr-2">
      <img
        src={props.image || noLogoToken}
        alt="logo"
        style={{ height: props?.size || "24px" }}
      />
      <span
        className="custom"
        onClick={toggleDisplayStyle}
        title={`Show in ${isUSDMode ? "ETH" : "USD"}`}
      >
        {formattedData &&
          (isUSDMode
            ? formattedData.formattedUsd
            : formattedData.formattedNative)}
      </span>
    </Link>
  );
}
export default TokenPrice;
