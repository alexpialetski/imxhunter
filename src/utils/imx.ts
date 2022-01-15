import { filter, keys, flow as pipe, map, sum } from "lodash/fp";
import { isUndefined } from "lodash";

import {
  StatsRarity,
  TokenVO,
  OrderRarity,
  OrderVO,
  CollectionStats,
} from "types";

export const getStatsRarity = (
  metaData: TokenVO["metadata"],
  collectionStats: CollectionStats
): OrderRarity["rarity"][] =>
  pipe(
    keys,
    pipe(
      map((key: string) => [collectionStats.tokenProperties[key], key]),
      filter(([property]) => !isUndefined(property)),
      map(
        ([statsRarity, statKey]: [
          statsRarity: Record<string, StatsRarity>,
          statKey: string
        ]) => statsRarity[metaData[statKey]].rarity
      ),
      map(parseFloat)
    )
  )(metaData);

export const getCost = (order: OrderVO): OrderRarity["cost"] =>
  Number(order.buy.data.quantity) / Math.pow(10, order.buy.data.decimals);

export const getRarity = (
  metaData: TokenVO["metadata"],
  collectionStats: CollectionStats
): number => 100 - sum(getStatsRarity(metaData, collectionStats));

export const mapToOrderRarity =
  (order: OrderVO, collectionStats: CollectionStats) =>
  (token: TokenVO): OrderRarity => ({
    cost: getCost(order),
    imxId: order.order_id,
    rarity: getRarity(token.metadata, collectionStats),
  });

export const mapToOrderRarityPrice =
  (order: OrderVO, collectionStats: CollectionStats) =>
  (token: TokenVO): OrderRarity => {
    const cost = getCost(order);
    const rarity = sum(getStatsRarity(token.metadata, collectionStats));

    return {
      cost: cost,
      imxId: order.order_id,
      rarity: (cost * 1000) / rarity,
    };
  };
