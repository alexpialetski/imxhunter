import React, { useState, useEffect } from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { getRarity } from "utils";
import { CollectionStats, TokenVO } from "types";
import { getTokenDetail } from "services/imx";

export type CalculatorProps = { collectionStats: CollectionStats };

export const Calculator: React.FC<CalculatorProps> = ({ collectionStats }) => {
  const [token, setToken] = useState<TokenVO>();
  const [tokenAddress, setTokenAddress] = useState<string>("");

  const handlePageSizeChange: TextFieldProps["onChange"] = (event) => {
    const value = String(event.target.value);
    if (value.length === 66) {
      setTokenAddress(value);
    }
  };

  useEffect(() => {
    if (tokenAddress) {
      getTokenDetail(collectionStats.tokenAddress, tokenAddress, {
        include_fees: "true",
      }).then(setToken);
    }
  }, [tokenAddress, collectionStats]);

  if (!token) {
    return (
      <TextField
        value={tokenAddress}
        onChange={handlePageSizeChange}
        label="Token address"
      />
    );
  }

  return (
    <>
      <h1>{`Your rarity is ${getRarity(token.metadata, collectionStats)}`}</h1>
      <Button
        onClick={() => {
          setToken(undefined);
          setTokenAddress("");
        }}
      >
        Reset
      </Button>
    </>
  );
};
