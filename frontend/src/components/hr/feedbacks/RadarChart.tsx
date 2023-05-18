import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    subject: "Quality focus",
    A: 4,
    B: 4,
    fullMark: 5,
  },
  {
    subject: "People skills",
    A: 5,
    B: 4,
    fullMark: 5,
  },
  {
    subject: "Self guidance",
    A: 4,
    B: 4,
    fullMark: 5,
  },
  {
    subject: "Readiness for change",
    A: 3,
    B: 4,
    fullMark: 5,
  },
  {
    subject: "Leadership",
    A: 4,
    B: 4,
    fullMark: 5,
  },
  {
    subject: "Creativity",
    A: 3,
    B: 4,
    fullMark: 5,
  },
];

const UserRadarChart = () => {
  return (
    <div
      style={{
        width: "90%",
        height: 300,

        borderRadius: 8,
      }}
    >
      <ResponsiveContainer>
        <RadarChart
          data={data}
          margin={{
            top: 0,
            right: 40,
            bottom: 20,
            left: 30,
          }}
        >
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" tick={{ fontSize: 9 }} />
          <PolarRadiusAxis />
          <Radar
            name="Particpants"
            dataKey="A"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.5}
          />
          <Radar
            name="Manager"
            dataKey="B"
            stroke="#82ca9d"
            fill="#82ca9d"
            fillOpacity={0.4}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserRadarChart;
