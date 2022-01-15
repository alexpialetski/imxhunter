import { OrderRarity } from "types/order";

export const getBookGamesTokenUrl = (orderRarity: OrderRarity): string =>
  `https://tokentrove.com/collection/BookGames/imx-${orderRarity.imxId}`;
