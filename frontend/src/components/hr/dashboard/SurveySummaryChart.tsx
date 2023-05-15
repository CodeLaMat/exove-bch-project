import React from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  // Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  {
    name: "Jan",
    2023: 60,
    2022: 30,
    amt: 100,
  },
  {
    name: "Feb",
    2023: 50,
    2022: 67,
    amt: 100,
  },
  {
    name: "Mar",
    2023: 76,
    2022: 39,
    amt: 100,
  },
  {
    name: "Apr",
    2023: 56,
    2022: 78,
    amt: 100,
  },
  {
    name: "Mei",
    2023: 18,
    2022: 48,
    amt: 100,
  },
  {
    name: "Jun",
    2023: 29,
    2022: 38,
    amt: 100,
  },
  {
    name: "Jul",
    2023: 34,
    2022: 43,
    amt: 100,
  },
  {
    name: "Aug",
    2023: 34,
    2022: 43,
    amt: 100,
  },
  {
    name: "Sep",
    2023: 38,
    2022: 43,
    amt: 100,
  },
  {
    name: "Oct",
    2023: 35,
    2022: 49,
    amt: 100,
  },
  {
    name: "Nov",
    2023: 90,
    2022: 43,
    amt: 100,
  },
  {
    name: "Dec",
    2023: 90,
    2022: 60,
    amt: 100,
  },
];

const SurveySummaryChart = () => {
  return (
    <div style={{ width: "90%", height: 300 }}>
      <ResponsiveContainer>
        <ComposedChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 20,
            right: 10,
            bottom: 0,
            left: 10,
          }}
        >
          {" "}
          <CartesianGrid stroke="#EAECFB" />
          <XAxis dataKey="name" scale="band" /> <p>Average</p>
          <YAxis />
          <Tooltip />
          <Legend />
          {/* <Bar dataKey="uv" barSize={20} fill="#413ea0" />
          <Bar dataKey="pv" barSize={10} fill="#4efeef" /> */}
          <Line type="monotone" dataKey="2023" stroke="#FD1F9B" />
          <Line type="monotone" dataKey="2022" stroke="#017EFA" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SurveySummaryChart;
