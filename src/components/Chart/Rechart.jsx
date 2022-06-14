import React, { useEffect } from 'react'
import moment from 'moment';
import { ComposedChart, Area, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, ResponsiveContainer } from 'recharts';
import { curveCardinal } from 'd3-shape';
import _get from 'lodash/get';
import _isEqual from 'lodash/isEqual';
import _merge from 'lodash/merge';
import { ONE_DAY_SECONDS, ONE_HOUR_SECONDS, CHART_TYPE } from "utils/constants";


const styles = {
  card: {
    margin: "1rem",
    flexBasis: "45%",
    padding: "1.5rem",
    textAlign: "left",
    color: "inherit",
    textDecoration: "none",
    border: "1px solid #eaeaea",
    borderRadius: "10px",
  },
  tooltip: {
    background: "transparent",
    color: "inherit",
    padding: "1rem",
    border: "none",
    textAlign: "left",
  },
  graphSec: {
    overflow: "hidden",
  },
  text_success: {
    color: '#43e2b2',
  },
  text_gray: {
    color: '#5f7885',
  },
  text_info: {
    color: '#1c76ff'
  }
}

const data = [];
let max = 34000;
let min = 12000;
for (let num = 30; num >= 0; num--) {
  data.push({
    date: new moment().subtract(num, "days").format('ll'),
    value: Math.random() * (max - min) + min,
  })
}

const dateFormattingByChartType = (chartType) => {
  // console.log(chartType);
  switch (chartType) {
    case CHART_TYPE.D:
      return {
        hour: '2-digit',
        minute: '2-digit',
      }
    case CHART_TYPE.WK:
      return {
        month: 'short',
        day: '2-digit',
      }
    case CHART_TYPE.MO:
      return {
        month: 'short',
        day: '2-digit',
      }
    case CHART_TYPE.YR:
      return {
        month: 'short',
        day: '2-digit',
      }
    default:
      return {
        month: 'short',
        day: '2-digit',
      }
  }
}
const cardinal = curveCardinal.tension(0.1)
// fetchChartPriceData();
const TradeChart = ({
  tokenData,
  setHoverValue,
  setHoverDate,
  isChangePositive,
  chartType
}) => {

  const HoverUpdater = ({ locale, payload, setHoverValue, setHoverDate }) => {
    // console.log(payload, "payload");
    useEffect(() => {
      setHoverValue(payload.value)
      // setHoverDate(moment(payload.date).format('llll'));
      setHoverDate(
        new Date(payload.date).toLocaleString(locale, {
          year: 'numeric',
          month: 'short',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        }))
    }, [locale, payload.value, payload.date, setHoverValue, setHoverDate]);

    return null;
  }

  const dateFormatter = dateFormattingByChartType(chartType);
  console.log(dateFormatter, "fcsdcs");
  return (
    <>
      {
        tokenData && tokenData.length > 0 ?
          (
            <ResponsiveContainer width="100%" height={400} style={{ paddingLeft: "1rem" }}>
              <AreaChart
                data={tokenData}
                onMouseLeave={() => {
                  if (setHoverDate) setHoverDate(undefined)
                  if (setHoverValue) setHoverValue(undefined)
                }}
              >
                <defs>
                  <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2451B7" stopOpacity={0.4} />
                    <stop offset="75%" stopColor="#2451B7" stopOpacity={0.05} />
                  </linearGradient>
                </defs>

                <Area type={cardinal} dataKey="value" stroke="#2451B7" fill="url(#color)" strokeWidth={2} />

                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  minTickGap={8}
                  tickFormatter={(date) => new Date(date).toLocaleString("en-US", dateFormatter)}
                />

                <YAxis
                  datakey="value"
                  axisLine={false}
                  tickLine={false}
                  tickCount={8}
                  hide
                  tickFormatter={(number) => `$${number.toFixed(2)}`}
                />
                <Tooltip
                  // cursor={{ stroke: theme.colors.textDisabled }}
                  contentStyle={{ display: 'none' }}
                  formatter={(tooltipValue, name, props) => (
                    <HoverUpdater
                      locale={"en-US"}
                      payload={props.payload}
                      setHoverValue={setHoverValue}
                      setHoverDate={setHoverDate}
                    />
                  )}
                />
                {/* <Tooltip
                      content={<CustomTooltip />}
                      wrapperStyle={{
                        transform: 'none!important',
                      }}
                      position={{ x: 10, y: -90 }}
                    /> */}

                <CartesianGrid opacity={0.1} strokeDasharray="3 3" />
              </AreaChart>
            </ResponsiveContainer>

          ) : null
      }
    </>
  );
}

// function CustomTooltip({ active, payload, label }) {
//   if (active) {
//     return (
//       <div style={styles.tooltip}>
//         <h3 className="heading" style={{ fontSize: '3.5rem' }}>${payload[0].value.toFixed(2)} <span className="" style={{ color: '#1c76ff', fontSize: '14px', display: 'inline-block', margin: '5px', verticalAlign: 'top' }}>SWAP/BNB<span className='ml-2 text-small font-bold ml-3' style={styles.text_success}>+1.918(+3.03%)<br /><span className="content text-small" style={styles.text_gray}>{moment(label).format("llll")}</span></span></span></h3>

//       </div >
//     );
//   }
//   return null;
// }

export default React.memo(TradeChart);

