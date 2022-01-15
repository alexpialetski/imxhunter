import React from "react";

import { OrderChart } from "components/OrderChart";
import { mapToOrderRarityPrice } from "utils";
import { CollectionStats } from "types";

export type OrderRarityPriceChartProps = {
  collectionStats: CollectionStats;
};

export const OrderRarityPriceChart: React.FC<OrderRarityPriceChartProps> = (
  props
) => (
  <OrderChart
    {...props}
    maxRange={100}
    coefCalculator={mapToOrderRarityPrice}
  />
);
