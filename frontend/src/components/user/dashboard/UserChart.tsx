import React from "react";
import { BarChart, Bar, ResponsiveContainer } from "recharts";

const data = [
  {
    name: "Page A",
    quality: 90,
    social: 80,
    self: 75,
    leader: 79,
    change: 87,
  },
];

const UserChart = () => {
  return (
    <ResponsiveContainer width="100%" height="20%">
      <BarChart width={50} height={20} data={data}>
        <Bar dataKey="quality" fill="#FD1F9B" />
        <Bar dataKey="social" fill="#264083" />
        <Bar dataKey="self" fill="#30D987" />
        <Bar dataKey="leader" fill="#6342FF" />
        <Bar dataKey="change" fill="#F0F410" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default UserChart;
