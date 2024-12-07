"use client";
import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import {
  Box,
  Container,
  Button,
  InputBase,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Avatar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ButtonUpdateSingerHeader from "./component/buttonUpdateSinger";
import { apiBasicClient, apiBasicClientPublic } from "@/app/utils/request"; // Assuming this is for API calls
import { TSuggestAvaSlugId } from "@/dataType/suggest"; // Adjust based on your data types
import BtnLoginLogout from "@/app/partial/LayOutBasic/component/btn-login-logout";
import { SwitchThemeButton } from "@/app/partial/LayOutBasic/component/button-dark-mode";
import Link from "next/link";
import NavigationButtons from "./component/btnHeaderForWardAndBack";

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const Header = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer - 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px) !important`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  ...(!open && {
    width: `calc(100% - calc(${theme.spacing(7)} + 1px))`,
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - calc(${theme.spacing(8)} + 1px))`,
    },
  }),
  "[data-mui-color-scheme='dark'] &": {
    background: "#090018",
  },
  "&.MuiPaper-root": {
    boxShadow: "none",
  },
}));

const SearchBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  borderRadius: theme.shape.borderRadius,
  padding: "4px 8px",
  marginRight: theme.spacing(2),
}));

export default function HeaderComponent({ open }: { open: boolean }) {
  const [filteredSuggestions, setFilteredSuggestions] = useState<
    TSuggestAvaSlugId[]
  >([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.toLowerCase();

    if (input) {
      try {
        // Gửi đồng thời hai yêu cầu để tiết kiệm thời gian
        const [response, response2] = await Promise.all([
          apiBasicClientPublic("GET", "/songs", { query: input, limit: 2 }),
          apiBasicClientPublic("GET", "/singers", { query: input, limit: 2 }),
        ]);

        // Kết hợp dữ liệu từ hai phản hồi
        const songs = response?.data.data || [];
        const singers = response2?.data || [];
        const combinedSuggestions = [...songs, ...singers];

        if (combinedSuggestions.length > 0) {
          setFilteredSuggestions(combinedSuggestions);
          setShowSuggestions(true);
        } else {
          setFilteredSuggestions([]);
          setShowSuggestions(false);
        }
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setFilteredSuggestions([]);
        setShowSuggestions(false);
      }
    } else {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSelectSuggestion = () => {
    setShowSuggestions(false);
  };
  const handleOnFocus = async (e: React.FocusEvent<HTMLInputElement>) => {
    setShowSuggestions(true);
  };
  const handleOnBlur = () => {
    setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
  };
  return (
    <Header position="fixed" open={open} color="secondary">
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Toolbar sx={{ flex: "1" }} disableGutters>
          <NavigationButtons />
          <SearchBox
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              position: "relative",
            }}
          >
            <SearchIcon />
            <InputBase
              placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
              inputProps={{ "aria-label": "search" }}
              onChange={handleSearchChange}
              onFocus={handleOnFocus}
              onBlur={handleOnBlur}
              sx={{
                color: "inherit",
                ml: 1,
                maxWidth: "400px",
                flexGrow: 1,
              }}
            />
            {showSuggestions && filteredSuggestions.length > 0 && (
              <Paper
                sx={{
                  position: "absolute",
                  zIndex: 2,
                  maxWidth: "400px",
                  width: "100%",
                  borderRadius: "0 0 10px 10px",
                  overflowY: "hidden",
                  top: "52px",
                }}
              >
                <List>
                  {filteredSuggestions.map((suggestion, index) => (
                    <Link
                      onClick={handleSelectSuggestion}
                      key={index}
                      href={
                        suggestion.title
                          ? `/songs/detail/${suggestion.slug}`
                          : `/singers/detailSinger/${suggestion.slug}`
                      }
                    >
                      <ListItem disablePadding>
                        <ListItemButton
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <ListItemText
                            primary={suggestion.title || suggestion.fullName}
                            secondary={
                              suggestion.title
                                ? suggestion.singerId?.fullName ||
                                  "Không rõ tác giả"
                                : "Nghệ sĩ"
                            }
                            primaryTypographyProps={{
                              style: { fontWeight: "bold" },
                            }}
                            secondaryTypographyProps={{}}
                          />
                          <ListItemIcon
                            sx={{
                              display: "flex",
                              flexDirection: "row-reverse",
                            }}
                          >
                            <Avatar
                              src={suggestion.avatar}
                              alt={suggestion.title || suggestion.fullName}
                              sx={{
                                objectFit: "cover",
                                aspectRatio: "1/1",
                                height: "40px", // Kích thước avatar
                                width: "40px",
                              }}
                            />
                          </ListItemIcon>
                        </ListItemButton>
                      </ListItem>
                    </Link>
                  ))}
                </List>
              </Paper>
            )}
          </SearchBox>

          <ButtonUpdateSingerHeader />
        </Toolbar>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <BtnLoginLogout />
          <SwitchThemeButton />
        </Box>
      </Container>
    </Header>
  );
}
