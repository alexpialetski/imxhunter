import React, { useEffect, useState, useMemo } from "react";
import { from } from "rxjs";
import { tap, map, mergeMap, combineAll, finalize, take } from "rxjs/operators";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import Slider, { SliderProps } from "@mui/material/Slider";

import { ChartByOrder, ChartByOrderProps } from "components/ChartByOrder";
import { Loader } from "components/Loader";
import { getOrders, getTokenDetail } from "services/imx";
import { CollectionStats, OrderRarity, OrderVO, TokenVO } from "types";

export type OrderChartProps = {
  collectionStats: CollectionStats;
  coefCalculator: (
    order: OrderVO,
    collectionStats: CollectionStats
  ) => (token: TokenVO) => OrderRarity;
  maxRange?: number;
};

export const OrderChart: React.FC<OrderChartProps> = ({
  collectionStats,
  coefCalculator,
  maxRange = 100,
}) => {
  const [rarityRange, setRarirityRange] = useState([0, maxRange]);
  const [pageSize, setPageSize] = useState(100);
  const [orders, setResponse] = useState<OrderRarity[]>([]);
  const [cursor, setCursor] = useState<string>();
  const [currentCursor, setCurrentCursor] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const subscription = from(
      getOrders({
        include_fees: "true",
        status: "active",
        sell_token_address: collectionStats.tokenAddress,
        buy_token_type: "ETH",
        cursor: cursor,
        page_size: String(pageSize),
        order_by: "buy_quantity",
        direction: "asc",
      })
    )
      .pipe(
        tap((response) => {
          setCurrentCursor(response.cursor);
        }),
        map((response) => response.result),
        mergeMap((list) => from(list))
      )
      .pipe(
        map((order) =>
          from(
            getTokenDetail(order.sell.data.token_address, order.sell.data.id, {
              include_fees: "true",
            })
          ).pipe(map(coefCalculator(order, collectionStats)))
        ),
        combineAll(),
        take(1),
        finalize(() => setLoading(false))
      )
      .subscribe((newOrders) => setResponse((prev) => prev.concat(newOrders)));

    return () => subscription?.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cursor, collectionStats]);

  const onBarClick: ChartByOrderProps["onBarClick"] = (data) => {
    window.open(collectionStats.getTokenUrl(data), "_blank");
  };

  const onRarityRangeChange: SliderProps["onChange"] = (_, newValue) =>
    Array.isArray(newValue) && setRarirityRange(newValue);

  const handleNextClick = () => setCursor(currentCursor);

  const handlePageSizeChange: TextFieldProps["onChange"] = (event) => {
    const value = Number(event.target.value);
    if (!isNaN(value) && value > 0) {
      setPageSize(value);
    }
  };

  const filteredOrders = useMemo<OrderRarity[]>(
    () =>
      orders.filter(
        (order) =>
          order.rarity < rarityRange[1] && order.rarity > rarityRange[0]
      ),
    [orders, rarityRange]
  );

  if (!orders.length) {
    return <Loader />;
  }

  return (
    <Box height="100%" width="100%" display="flex" flexDirection="column">
      <Box display="flex" alignItems="center">
        <TextField
          id="outlined-number"
          label="Fetch at once"
          type="number"
          onChange={handlePageSizeChange}
          value={pageSize}
          sx={{ marginRight: "16px" }}
          size="small"
        />
        <Slider
          getAriaLabel={() => "Coef Range"}
          value={rarityRange}
          max={maxRange}
          onChange={onRarityRangeChange}
          valueLabelDisplay="auto"
        />
        <Button
          sx={{ marginLeft: "16px" }}
          variant="contained"
          onClick={handleNextClick}
        >
          {loading ? "Loading..." : "Next"}
        </Button>
      </Box>
      <ChartByOrder series={filteredOrders} onBarClick={onBarClick} />
    </Box>
  );
};
