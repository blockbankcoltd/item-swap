import { Typography } from "antd";
import React from "react";
import { Label } from "reactstrap";
import { formatAmount, formatAmountNotation } from "./fetch/miscFunctions";

const formatOptions = {
  notation: "standard",
  displayThreshold: 0.001,
  tokenPrecision: true,
};
const styles = {
  priceDisplay: {
    background: "transparent",
    color: "inherit",
    padding: "1rem",
    border: "none",
    textAlign: "left",
  },
  inputSymbol: {
    color: "#1c76ff",
    fontSize: "14px",
    display: "inline-block",
    margin: "5px",
    verticalAlign: "top",
  },
  text_success: {
    color: "#43e2b2",
  },
  text_danger: {
    color: "#ED4B9E",
  },
  text_gray: {
    color: "#5f7885",
  },
  text_info: {
    color: "#1c76ff",
  },
};
const { Title, Text } = Typography;
const PriceDisplay = ({
  value,
  isChangePositive,
  changeValue,
  changePercentage,
  inputSymbol,
  outputSymbol,
  children,
  displayDate,
  format = true,
  ...props
}) => {
  return value ? (
    <div style={styles.priceDisplay}>
      <Title
        level={1}
        className="mg-bottom-0 mg-r-8  heading"
        style={{ marginBottom: 0, color: "var(--primary-color2)" }}
      >
        $
        {format
          ? formatAmount(
              typeof value === "string" ? parseFloat(value) : value,
              formatOptions,
            )
          : value}
        <Text style={styles.inputSymbol}>
          <span style={{ marginRight: "0.8rem" }}>{inputSymbol}</span>
          <Text
            className="text-small font-bold"
            style={isChangePositive ? styles.text_success : styles.text_danger}
            ml="4px"
          >
            {`${isChangePositive ? "+" : ""}${changeValue.toFixed(
              3,
            )} (${changePercentage}%)`}
            <br />
            <Text className="content text-small" style={styles.text_gray}>
              {displayDate}
            </Text>
          </Text>
        </Text>
      </Title>
      {/* {children} */}
    </div>
  ) : null;
};

export default PriceDisplay;
