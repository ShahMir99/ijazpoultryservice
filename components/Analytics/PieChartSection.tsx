"use client"

import { formatter } from "@/lib/utils";
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";


const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "#fff",
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        <p style={{ margin: 0, fontWeight: "bold", color: payload[0].color }}>
          {payload[0].name}
        </p>
        <p style={{ margin: 0 }}>Value: {formatter.format(payload[0].value)}</p>
      </div>
    );
  }

  return null;
};

const PieChartSection = ({pendings} : any) => {

  const data = [
    { name: "Pendings Due", value: pendings.pendingDues || 1},
    { name: "Recevied Balance", value: pendings.pendingBalance ||1},
  ];
  const COLORS = ["#0088FE", "#FFBB28"];

  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div style={{ width: '100%', height: 200 }}>
      <ResponsiveContainer>
        <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="50%"
            outerRadius="80%"
            fill="#8884d8"
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartSection;
