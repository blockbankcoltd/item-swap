import React, { PureComponent } from "react";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
  ResponsiveContainer,
} from "recharts";
import moment from "moment";
import { ETHLogo } from "components/Chains/Logos";

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
    color: "#43e2b2",
  },
  text_gray: {
    color: "#5f7885",
  },
  text_info: {
    color: "#1c76ff",
  },
};

const getPath = (x, y, width, height) =>
  `M${x},${y + height}
   C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${
    x + width / 2
  }, ${y}
   C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
    x + width
  }, ${y + height}
   Z`;

const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

export default class Example extends PureComponent {
  static demoUrl = "https://codesandbox.io/s/stacked-area-chart-ix341";

  render() {
    let data1 = this.props.data;
    let duration = this.props.duration;
    let date = null;
    if (duration === "week") {
      date = moment().subtract(6, "days").format("MM/DD/YYYY");
    } else if (duration === "month") {
      date = moment().subtract(1, "month").format("MM/DD/YYYY");
    } else if (duration === "year") {
      date = moment().subtract(1, "year").format("MM/DD/YYYY");
    }
    if (date) {
      data1 = data1.filter((d) => moment(d.name) >= moment(date));
    }
    console.log(data1, moment(data1[0].name), moment(date), duration);
    function CustomTooltip({ active, payload, label }) {
      if (active) {
        return (
          <div style={styles.tooltip}>
            <h4
              className="heading"
              style={{ fontSize: "3.5rem", color: "var(--primary-color2)" }}
            >
              <ETHLogo /> {payload[0].payload.ETH.toFixed(2)}
              {/* <small style={{ fontSize: "12px" }}>&nbsp; ETH</small> */}
              <span
                className=""
                style={{
                  color: "orange",
                  fontSize: "14px",
                  display: "inline-block",
                  margin: "5px",
                  verticalAlign: "top",
                }}
              >
                ${payload[0].payload.dataPriceFloorUSD.toFixed(2)},
                <span
                  className="ml-2 text-small font-bold ml-3"
                  style={{ color: "var(--bar-chart)" }}
                >
                  &nbsp; Num. sales- {payload[0].payload.sales}
                  <br />
                  <span className="content text-small" style={styles.text_gray}>
                    {moment(label).format("llll")}
                  </span>
                </span>
              </span>
            </h4>
          </div>
        );
      }
      return null;
    }

    return (
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          width={500}
          height={400}
          data={data1}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: -40,
          }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#129a74" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="name" scale="band" tick={false} />
          <YAxis tick={false} axisLine={false} />
          <Tooltip content={<CustomTooltip />} position={{ x: 40, y: -70 }} />
          <Legend />
          <Area
            type="monotone"
            dataKey="ETH"
            fillOpacity={1}
            // stroke={false}
            strokeWidth={1}
            stroke="#10dfef"
            fill="url(#colorUv)"
          />
          <Bar
            dataKey="sales"
            barSize={20}
            fill="var(--bar-chart)"
            shape={<TriangleBar />}
          />
          {/* <Line type="monotone" dataKey="ETH" stroke="#10dfef" dot={false} /> */}
          <Line type="monotone" dataKey="USD" stroke="orange" dot={false} />
          {/* <Scatter dataKey="cnt" fill="red" /> */}
        </ComposedChart>
      </ResponsiveContainer>
    );
  }
}
