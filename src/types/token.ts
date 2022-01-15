export type TokenVO = {
  token_address: string;
  token_id: string;
  id: string;
  user: string;
  status: "imx";
  uri: null;
  name: string;
  description: string;
  image_url: string;
  metadata: Record<string, string>;
  collection: {
    name: string;
    icon_url: string;
  };
  created_at: string;
  updated_at: string;
  fees: [
    {
      type: "royalty";
      address: string;
      percentage: number;
    }
  ];
};
