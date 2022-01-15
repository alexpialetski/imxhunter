import pickBy from "lodash/fp/pickBy";
import identity from "lodash/fp/identity";

import { OrderVO } from "types/order";
import { TokenVO } from "types/token";

type GetOrdersResponse = {
  result: OrderVO[];
  cursor: string;
  remaining: number;
};

type GetOrderListParams = Partial<{
  include_fees: "true" | "false";
  status: "active";
  sell_token_address: string;
  buy_token_type: "ETH";
  page_size: string;
  cursor: string;
  order_by: "buy_quantity";
  direction: "asc" | "desc";
}>;

export const getOrders = (
  queryParams: GetOrderListParams
): Promise<GetOrdersResponse> =>
  fetch(
    `https://api.x.immutable.com/v1/orders?${new URLSearchParams(
      pickBy(identity, queryParams)
    ).toString()}`
  ).then((res) => res.json());

type GetTokenDetailParams = Partial<{
  include_fees: "true" | "false";
}>;

export const getTokenDetail = (
  sellTokenAddress: string,
  tokenAddress: string,
  queryParams: GetTokenDetailParams
): Promise<TokenVO> =>
  fetch(
    `https://api.x.immutable.com/v1/assets/${sellTokenAddress}/${tokenAddress}?${new URLSearchParams(
      pickBy(identity, queryParams)
    ).toString()}`
  ).then((res) => res.json());
