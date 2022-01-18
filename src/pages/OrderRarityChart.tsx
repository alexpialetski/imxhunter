import React from "react";

import { OrderChart } from "components/OrderChart";
import { mapToOrderRarity } from "utils";
import { CollectionStats } from "types";

export type OrderRarityChartProps = {
  collectionStats: CollectionStats;
};

export const OrderRarityChart: React.FC<OrderRarityChartProps> = (props) => (
  <OrderChart {...props} coefCalculator={mapToOrderRarity} />
);
