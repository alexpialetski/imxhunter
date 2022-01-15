import { OrderRarity } from "./order";
import { TokenVO } from "./token";

export type StatsRarity = { count: number; rarity: string };

export type CollectionStats = {
  tokenAddress: TokenVO["token_address"];
  tokenCount: number;
  getTokenUrl: (order: OrderRarity) => string;
  tokenProperties: Record<string, Record<string, StatsRarity>>;
};
