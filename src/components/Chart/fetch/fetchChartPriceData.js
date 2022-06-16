import moment from "moment";
import { useMemo, useState } from "react";
import {
  ONE_DAY_SECONDS,
  ONE_HOUR_SECONDS,
  CHART_TYPE,
  ETH_ADDRESS,
  BNB_ADDRESS,
  TOKEN_LIST,
} from "utils/constants";
import { useChain } from "react-moralis";
import { getWrappedNative } from "helpers/networks";

const getInterval = (chartType) => {
  switch (chartType) {
    case CHART_TYPE.D:
      return ONE_HOUR_SECONDS * 4;
    case CHART_TYPE.WK:
      return ONE_HOUR_SECONDS * 4;
    case CHART_TYPE.MO:
      return ONE_DAY_SECONDS;
    case CHART_TYPE.YR:
      return ONE_DAY_SECONDS * 15;
    default:
      return ONE_HOUR_SECONDS * 4;
  }
};

const getSkipDaysToStart = (chartType) => {
  switch (chartType) {
    case CHART_TYPE.D:
      return 1;
    case CHART_TYPE.WK:
      return 7;
    case CHART_TYPE.MO:
      return 30;
    case CHART_TYPE.YR:
      return 365;
    default:
      return 7;
  }
};

const fetchChartPriceData = async ({ chartType, chain }) => {
  let chainArray = TOKEN_LIST.find((d) => d.key === chain);
  const interval = getInterval(chartType);
  const endTimestamp = moment().unix();
  const startTimestamp = moment(endTimestamp * 1000)
    .startOf("hour")
    .subtract(getSkipDaysToStart(chartType), "days")
    .unix();
  const timeStamps = [];
  let time = startTimestamp;
  while (time <= endTimestamp) {
    timeStamps.push(time);
    time += interval;
  }
  const activeTokenAddress = getWrappedNative(chain);
  const getBlocks = await Promise.all(
    timeStamps.map(async (timestamp, i) => {
      console.log("entered promise");
      return Moralis.Web3API.native.getDateToBlock({ date: timestamp, chain });
    }),
  );

  console.log("getBlocks", getBlocks);
  let getBlocksPrice = await Promise.all(
    getBlocks.map(
      async (e, i) =>
        await Moralis.Web3API.token.getTokenPrice({
          address: chainArray.address,
          chain,
          to_block: e.block,
        }),
    ),
  );

  let tokenData = timeStamps.map((time, i) => {
    return {
      value: parseFloat(getBlocksPrice[i].usdPrice),
      date: moment.unix(time).format("llll"),
    };
  });
  return { tokenData };
};

export default fetchChartPriceData;
