import { useState, memo, useEffect } from 'react'
import { Typography } from 'antd';
import { Button, ButtonGroup } from 'reactstrap';
import PriceDisplay from './PriceDisplay';
import { CHART_TYPE, TOKEN_LIST } from '../../utils/constants';
import fetchChartPriceData from './fetch/fetchChartPriceData'
import { getTimeWindowChange } from './fetch/miscFunctions'
import TokenChart from './Rechart'
import { Flex } from 'uikit/Flex/Flex';
import { useChain } from "react-moralis";



const styles = {
  graphSec: {
    overflow: "hidden",
  },
  btnGroup: {
    padding: '5px',
    backgroundColor: '#6c757d',
    borderColor: '#6c757d',
    borderRadius: '5px'
  }
}
const currentDate = new Date().toLocaleString("en-US", {
  year: 'numeric',
  month: 'short',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
});

const { Text } = Typography;
const ChartUI = () => {
  const [chartType, setChartType] = useState(CHART_TYPE.D);
  const [tokenCData, setTokenData] = useState([]);
  const [hoverValue, setHoverValue] = useState("")
  const [hoverDate, setHoverDate] = useState("")
  const { chainId, chain } = useChain();
  console.log("chan", chainId, chain);
  const nativeTokenSymbol = chain?.nativeCurrency.symbol;
  useEffect(async () => {
    const { tokenData = [] } = await fetchChartPriceData({ chartType, chain: chainId });
    await setTokenData(tokenData)
  }, [chartType, chain])
  // console.log(tokenCData)
  const valueToDisplay = hoverValue || tokenCData[tokenCData.length - 1]?.value
  const { changePercentage, changeValue } = getTimeWindowChange(tokenCData);
  const isChangePositive = changeValue >= 0;
  // console.log("changePercentage", valueToDisplay);
  const handleClick = (e) => {
    setChartType(e.target.value);
  }
  return (
    <div className="sc-card-product" style={styles.graphSec}>
      <section className="tf-section today-pick" >
        <div className="themesflat-container">
          <Flex container justifyContent="space-between" alignItems='center' flexBasis={0}>
            <PriceDisplay
              value={tokenCData?.length > 0 && valueToDisplay}
              inputSymbol={nativeTokenSymbol}
              isChangePositive={isChangePositive}
              changeValue={changeValue}
              changePercentage={changePercentage}
              displayDate={hoverDate || currentDate}
            // outputSymbol={outputCurrency?.symbol}
            >
            </PriceDisplay>
            <ButtonGroup activeIndex={chartType} onClick={handleClick} size="lg" style={styles.btnGroup}>
              <Button value="DAY">{'24H'}</Button>
              <Button value='WEEK'>{'1W'}</Button>
              <Button value='MONTH'>{'1M'}</Button>
              <Button value='YEAR'>{'1Y'}</Button>
            </ButtonGroup>
            <div style={{ width: '25%' }}>&nbsp;</div>
          </Flex>
          <TokenChart
            tokenData={tokenCData}
            setHoverValue={setHoverValue}
            setHoverDate={setHoverDate}
            isChangePositive={isChangePositive}
            chartType={chartType}
          />
        </div>
      </section>
    </div>
  )
}

export default memo(ChartUI);