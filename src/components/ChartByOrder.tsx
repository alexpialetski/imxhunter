import {
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
  Tooltip,
} from "recharts";

import { OrderRarity } from "types/order";

const DOMAIN = ["auto", "auto"];

export type ChartByOrderProps = {
  series: OrderRarity[];
  onBarClick?: (data: OrderRarity) => void;
};

export const ChartByOrder: React.FC<ChartByOrderProps> = ({
  series,
  onBarClick,
}) => (
  <ResponsiveContainer>
    <BarChart data={series} margin={{ left: 0, top: 20, right: 20, bottom: 0 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="cost" domain={DOMAIN} />
      <YAxis domain={["auto", "auto"]} />
      <Tooltip />
      <Bar dataKey="rarity" fill="#8884d8" onClick={onBarClick} />
    </BarChart>
  </ResponsiveContainer>
);
