import { OrderVO } from "types/order";
import { TokenVO } from "types/token";

export const ORDER: OrderVO = {
  order_id: 12036690,
  status: "active",
  user: "0x955759a54c5193704ead3eea83a26cc05d7f9336",
  sell: {
    type: "ERC721",
    data: {
      token_id: "49230",
      id: "0x6076726fccb5aef16e161fea38c2f9f9abbf3cc5a66575068db439fbde2f1c08",
      token_address: "0xac98d8d1bb27a94e79fbf49198210240688bb1ed",
      quantity: "1",
      properties: {
        name: "Your Ability To Be Accountable Counts #49230",
        image_url:
          "https://res.cloudinary.com/nenvy-llc/image/upload/e_pixelate:0/e_pixelate:0,u_veefriends:specials:book:lava:your-ability-to-be-accountable-counts.jpg/v637774385853100227/veefriends/specials/book/frames/marble.png",
        collection: {
          name: "Book Games",
          icon_url: "https://veefriends.com/images/imx/icon.png",
        },
      },
    },
  },
  buy: {
    type: "ETH",
    data: {
      token_address: "",
      decimals: 18,
      quantity: "186735000000000000",
    },
  },
  amount_sold: null,
  expiration_timestamp: "2121-01-14T18:00:00Z",
  timestamp: "2022-01-14T18:17:49.51703Z",
  updated_timestamp: "2022-01-14T18:17:49.51703Z",
  fees: [
    {
      type: "royalty",
      address: "0x263a1c688c4426eede9b57e741ffb2b9cadcca94",
      token: { type: "ETH", data: { decimals: 18 } },
      amount: "9735000000000000",
    },
  ],
};

export const TOKEN: TokenVO = {
  token_address: "0xac98d8d1bb27a94e79fbf49198210240688bb1ed",
  token_id: "49230",
  id: "0x6076726fccb5aef16e161fea38c2f9f9abbf3cc5a66575068db439fbde2f1c08",
  user: "0x955759a54c5193704ead3eea83a26cc05d7f9336",
  status: "imx",
  uri: null,
  name: "Your Ability To Be Accountable Counts #49230",
  description:
    "The Book Games are a first-of-its-kind Layer 2 NFT created by Gary Vaynerchuk, linking to his best-selling book, Twelve and a Half. Before embarking on this journey, players must remember...BOOK GAMES IS PLAYED FOREVER!  Each token grants the holder special opportunities within the VeeFriends universe.  Visit veefriends.com/bookgames to connect your wallet and play.",
  image_url:
    "https://res.cloudinary.com/nenvy-llc/image/upload/e_pixelate:0/e_pixelate:0,u_veefriends:specials:book:lava:your-ability-to-be-accountable-counts.jpg/v637774385853100227/veefriends/specials/book/frames/marble.png",
  metadata: {
    ID: "49230",
    name: "Your Ability To Be Accountable Counts #49230",
    Series: "Book Games",
    Attribute: "Accountability",
    image_url:
      "https://res.cloudinary.com/nenvy-llc/image/upload/e_pixelate:0/e_pixelate:0,u_veefriends:specials:book:lava:your-ability-to-be-accountable-counts.jpg/v637774385853100227/veefriends/specials/book/frames/marble.png",
    Spectacular: "Lava",
    "Token Frame": "Marble",
    description:
      "The Book Games are a first-of-its-kind Layer 2 NFT created by Gary Vaynerchuk, linking to his best-selling book, Twelve and a Half. Before embarking on this journey, players must remember...BOOK GAMES IS PLAYED FOREVER!  Each token grants the holder special opportunities within the VeeFriends universe.  Visit veefriends.com/bookgames to connect your wallet and play.",
  },
  collection: {
    name: "Book Games",
    icon_url: "https://veefriends.com/images/imx/icon.png",
  },
  created_at: "2022-01-10T04:35:08.970013Z",
  updated_at: "2022-01-10T23:40:20.302928Z",
  fees: [
    {
      type: "royalty",
      address: "0x263a1c688c4426eede9b57e741ffb2b9cadcca94",
      percentage: 5.5,
    },
  ],
};
