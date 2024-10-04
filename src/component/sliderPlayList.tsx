import { SyntheticEvent, useState } from "react";
import { Drawer, Button, IconButton, useMediaQuery } from "@mui/material";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { useTheme } from "@emotion/react";

const RightSlider = () => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  //@ts-ignore
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  // Hàm để toggle trạng thái của slider
  const toggleDrawer =
    (open: boolean) => (event: SyntheticEvent | KeyboardEvent) => {
      if (
        (event.type === "keydown" && (event as KeyboardEvent).key === "Tab") ||
        (event as KeyboardEvent).key === "Shift"
      ) {
        return;
      }
      setIsOpen(open);
    };

  return (
    <>
      {/* Button nằm ở góc trên bên phải */}
      <Button
        onClick={toggleDrawer(true)}
        style={{ position: "fixed", bottom: "90px", right: "3px" }}
        variant="contained"
        color="primary"
      >
        <MenuOpenIcon
          sx={{
            marginRight: {
              xs: 0, // Không có margin trên các màn hình nhỏ
              md: "8px", // Có margin 8px trên màn hình md trở lên
            },
          }}
        />
        {!isSmallScreen && "Playlist"}
      </Button>

      {/* Slider nằm bên phải */}
      <Drawer anchor="right" open={isOpen} onClose={toggleDrawer(false)}>
        <div
          style={{ width: 250, padding: 20 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <h3>Danh sách phát</h3>
          <p>Hiện đang không có danh sách nhạc nào được phát</p>
        </div>
      </Drawer>
    </>
  );
};

export default RightSlider;
