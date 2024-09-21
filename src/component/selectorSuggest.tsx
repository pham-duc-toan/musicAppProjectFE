"use client";
import React, { useRef, useState } from "react";
import {
  TextField,
  List,
  ListItem,
  ListItemButton,
  Paper,
  ListItemIcon,
  Avatar,
  ListItemText,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { Box } from "@mui/system";
import { apiBasicClient } from "@/app/utils/request";

import { TPropSelector } from "@/dataType/propSelector";
import { TSuggestAvaSlugId } from "@/dataType/suggest";
import { useAppContext } from "@/context-app";

const SelectorSuggest = (props: TPropSelector) => {
  const router = useRouter();
  const { showMessage } = useAppContext();
  const { name, label, urlFetch, suggestKey } = props;
  const [filteredSuggests, setFilteredSuggests] = useState<TSuggestAvaSlugId[]>(
    []
  );
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [valueId, setValueId] = useState("");
  const [shrink, setShrink] = useState(false);
  const handleChangSuggest = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.toLowerCase();

    let objectParam = undefined as any;
    if (input) {
      objectParam = {
        [suggestKey]: input,
        slug: input,
      };
      setShrink(true);
    } else {
      setShrink(false);
      objectParam = undefined;
    }
    const listSuggest = await apiBasicClient("GET", `${urlFetch}`, objectParam);

    if (!listSuggest?.data) {
      showMessage(
        `${listSuggest?.message}` || "Không tìm được dữ liệu",
        "error"
      );
      if (listSuggest.redirect) {
        router.push("/login");
      }
      return;
    }
    setFilteredSuggests(listSuggest.data);
    setShowSuggestions(true);
  };
  const handleOnFocus = async (e: React.FocusEvent<HTMLInputElement>) => {
    const input = e.target.value.toLowerCase();
    let objectParam = undefined as any;
    if (input) {
      objectParam = {
        [suggestKey]: input,
        slug: input,
      };
    } else {
      objectParam = undefined;
    }
    const listSuggest = await apiBasicClient("GET", `${urlFetch}`, objectParam);

    if (!listSuggest?.data) {
      showMessage(
        `${listSuggest?.message}` || "Không tìm được dữ liệu",
        "error"
      );
      if (listSuggest.redirect) {
        router.push("/login");
      }
      return;
    }
    setFilteredSuggests(listSuggest.data);
    setShowSuggestions(true);
  };
  const handleOnBlur = () => {
    setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
  };
  const handleSelectSuggest = (suggest: TSuggestAvaSlugId) => {
    setShowSuggestions(false);
    setValueId(suggest._id);
    const inputSelect = document.querySelector(`input[name="${name}"]`);
    setShrink(true);
    //@ts-ignore
    (inputSelect as HTMLInputElement).value = suggest[suggestKey];
  };

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <TextField
        onChange={handleChangSuggest}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        inputProps={{
          valueid: valueId,
        }}
        InputLabelProps={{
          shrink: !!shrink,
        }}
        fullWidth
        size="small"
        label={label}
        name={name}
        required
      />
      {showSuggestions && filteredSuggests && filteredSuggests.length > 0 && (
        <Paper
          style={{
            position: "absolute",
            zIndex: 2,
            width: "100%",
            maxHeight: 200,
            overflowY: "auto",
          }}
        >
          <List>
            {filteredSuggests.map((suggest: TSuggestAvaSlugId, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                  onClick={() => handleSelectSuggest(suggest)}
                >
                  <ListItemText primary={suggest.title || suggest.fullName} />
                  <ListItemIcon
                    sx={{ display: "flex", flexDirection: "row-reverse" }}
                  >
                    <Avatar
                      src={suggest.avatar}
                      alt={suggest.title || suggest.fullName}
                      sx={{
                        objectFit: "cover",
                        aspectRatio: "1/1",
                        height: "100%",
                      }}
                    />
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default SelectorSuggest;
