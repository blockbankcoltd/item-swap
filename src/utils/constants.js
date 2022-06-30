import {
  AvaxLogo,
  PolygonLogo,
  BSCLogo,
  ETHLogo,
} from "components/Chains/Logos";

export const ONE_DAY_SECONDS = 86400; // 24h * 60m * 60s
export const ONE_HOUR_SECONDS = 3600;
export const CHART_TYPE = { D: "DAY", WK: "WEEK", MO: "MONTH", YR: "YEAR" };
export const TOKEN_ADDRESS = {};
export const ETH_ADDRESS = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
export const BNB_ADDRESS = "0x0000000000000000000000000000000000001002";
export const MIN_VALUE_DISPLAYED = 0.001;
export const TOKEN_LIST = [
  {
    key: "0x1",
    value: "Ethereum",
    address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    chainName: "eth",
    icon: <ETHLogo />,
  },
  {
    key: "0x4",
    value: "Rinkeby Testnet",
    icon: <ETHLogo />,
  },
  {
    key: "0x38",
    value: "Binance",
    address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    chainName: "bsc",
    icon: <BSCLogo />,
  },
  {
    key: "0x61",
    value: "Smart Chain Testnet",
    icon: <BSCLogo />,
  },
];
