"use client";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Theme,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface I {
  theme: Theme;
  open: boolean;
  children: React.ReactNode;
  data: {
    router: string;
    name: string;
  };
}
const ItemSider = (props: I) => {
  const { theme, open, data, children } = props;
  const route = useRouter();
  return (
    <>
      <ListItem disablePadding sx={{ display: "block" }}>
        <Link href={`${data.router}`}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              {children}
            </ListItemIcon>
            <ListItemText
              primary={`${data.name}`}
              sx={{ opacity: open ? 1 : 0 }}
            />
          </ListItemButton>
        </Link>
      </ListItem>
    </>
  );
};
export default ItemSider;
