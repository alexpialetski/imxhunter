import React, { useCallback } from "react";
import { useHistory, useLocation } from "react-router-dom";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PieChart from "@mui/icons-material/PieChart";
import BarChart from "@mui/icons-material/BarChart";
import Calculator from "@mui/icons-material/Calculate";
import ListSubheader from "@mui/material/ListSubheader";
import Divider from "@mui/material/Divider";

import { CollectionSlug, PageSlug } from "types/app";
import bookGamesIcon from "assets/bg.png";
import creatureClubIcon from "assets/hcc_logo.svg";

type PageInfo = {
  path: `/${CollectionSlug}/${PageSlug}`;
  text: string;
  Icon: React.ReactNode;
};

const getAvailablePages = (slug: CollectionSlug): Array<PageInfo> => [
  {
    path: `/${slug}/priceToRarity`,
    text: "Deal hunter",
    Icon: <PieChart />,
  },
  {
    path: `/${slug}/rarity`,
    text: "Raririty chart",
    Icon: <BarChart />,
  },
  {
    path: `/${slug}/calculator`,
    text: "Rarity calculator",
    Icon: <Calculator />,
  },
];

export const LINKS: Map<
  { collection: CollectionSlug; label: string; Icon: React.ReactNode },
  Array<PageInfo>
> = new Map([
  [
    {
      collection: "bookgames",
      label: "Book games",
      Icon: <img src={bookGamesIcon} width="32" alt="Book games" />,
    },
    getAvailablePages("bookgames"),
  ],
  [
    {
      collection: "creatureclub",
      label: "Creature club",
      Icon: <img src={creatureClubIcon} width="32" alt="Creature club" />,
    },
    getAvailablePages("creatureclub"),
  ],
]);

export const SideMenuListItems: React.FC = () => {
  const history = useHistory();
  const location = useLocation();

  const onButtonClick = useCallback(
    (path: string) => () => {
      history.push(path);
    },
    [history]
  );
  const isLinkActive = (path: string) => location.pathname.includes(path);

  return (
    <List>
      {Array.from(LINKS.entries()).map(([collectionInfo, pages]) => (
        <React.Fragment key={collectionInfo.collection}>
          <ListSubheader>{collectionInfo.Icon}</ListSubheader>
          {pages.map(({ Icon, text, path }) => (
            <ListItemButton
              key={path}
              onClick={onButtonClick(path)}
              selected={isLinkActive(path)}
            >
              <ListItemIcon>{Icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          ))}
          <Divider />
        </React.Fragment>
      ))}
    </List>
  );
};
