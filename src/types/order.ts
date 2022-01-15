export type CryptoTokenData = {
  type: "ETH";
  data: {
    token_address?: string;
    decimals: number;
    quantity?: string;
  };
};

export type OrderVO = {
  order_id: number;
  status: "active";
  user: string;
  sell: {
    type: "ERC721";
    data: {
      token_id: string;
      id: string;
      token_address: string;
      quantity: string;
      properties: {
        name: string;
        image_url: string;
        collection: {
          name: string;
          icon_url: string;
        };
      };
    };
  };
  buy: CryptoTokenData;
  amount_sold: null;
  expiration_timestamp: string;
  timestamp: string;
  updated_timestamp: string;
  fees: [
    {
      type: "royalty";
      address: string;
      token: CryptoTokenData;
      amount: string;
    }
  ];
};

export type OrderRarity = {
  cost: number;
  rarity: number;
  imxId: number;
};
