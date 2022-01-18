import React from "react";
import { ThemeProvider } from "@mui/material";
import { Route, BrowserRouter, Redirect } from "react-router-dom";

import { theme } from "constants/theme";
import { Dashboard } from "components/Dashboard";
import { OrderRarityPriceChart, OrderRarityChart, Calculator } from "pages";
import { CollectionSlug, CollectionStats, PageSlug } from "types";
import { BookGamesStats } from "constants/bookGamesStats";
import { CreatureClubStats } from "constants/creatureClubStats";

const getAppUrl = (collectionSlug: CollectionSlug, pageSlug: PageSlug) =>
  `/${collectionSlug}/${pageSlug}`;

const COLLECTION_TO_ROUTES = new Map<CollectionSlug, CollectionStats>([
  ["creatureclub", CreatureClubStats],
  ["bookgames", BookGamesStats],
]);

export const App: React.FC = () => (
  <BrowserRouter basename="/imxhunter">
    <ThemeProvider theme={theme}>
      <Dashboard>
        <Route exact path="/:collection?">
          <Redirect to={getAppUrl("bookgames", "priceToRarity")} />
        </Route>
        {Array.from(COLLECTION_TO_ROUTES.entries()).map(
          ([collectionSlug, collectionStats]) => (
            <React.Fragment key={collectionSlug}>
              <Route exact path={getAppUrl(collectionSlug, "priceToRarity")}>
                <OrderRarityPriceChart collectionStats={collectionStats} />
              </Route>
              <Route exact path={getAppUrl(collectionSlug, "rarity")}>
                <OrderRarityChart collectionStats={collectionStats} />
              </Route>
              <Route exact path={getAppUrl(collectionSlug, "calculator")}>
                <Calculator collectionStats={collectionStats} />
              </Route>
            </React.Fragment>
          )
        )}
      </Dashboard>
    </ThemeProvider>
  </BrowserRouter>
);
