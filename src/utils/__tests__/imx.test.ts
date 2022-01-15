import { BookGamesStats } from "constants/bookGamesStats";
import { TOKEN } from "mocks/bookGames";
import { OrderRarity, TokenVO } from "types";

import { getStatsRarity } from "../imx";

describe("imx", () => {
  test.each<{ meta: TokenVO["metadata"]; expected: OrderRarity["rarity"][] }>([
    { meta: TOKEN.metadata, expected: [9.68, 33.22, 8.32] },
  ])("getRarity", ({ meta, expected }) =>
    expect(getStatsRarity(meta, BookGamesStats)).toStrictEqual(expected)
  );
});
