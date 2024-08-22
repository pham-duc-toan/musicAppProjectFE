import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Theme,
} from "@mui/material";
import Link from "next/link";

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
  return (
    <>
      <Link
        style={{
          textDecoration: "none",
          color: theme.palette.text.primary,
        }}
        href={`${data.router}`}
      >
        <ListItem disablePadding sx={{ display: "block" }}>
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
        </ListItem>
      </Link>
    </>
  );
};
export default ItemSider;
