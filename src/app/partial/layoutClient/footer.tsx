"use client";

import { useHasMounted } from "@/app/utils/customHook";
import { useTheme } from "@mui/material";
import { Box, color, Container, flexbox, styled } from "@mui/system";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
const StyledAudioPlayer = styled(AudioPlayer)(({ theme }) => {
  return {
    "& .rhap_time": {
      color: theme.palette.text.primary,
    },
    "& .rhap_repeat-button": {
      color: theme.palette.text.primary,
    },
    "& .rhap_progress-indicator": {
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.text.primary,
    },
    "& .rhap_main-controls-button": {
      color: theme.palette.text.primary,
    },
    "& .rhap_volume-button": {
      color: theme.palette.text.primary,
    },
    "& .rhap_progress-filled": {
      backgroundColor: theme.palette.text.primary,
    },
    "& .rhap_volume-indicator": {
      backgroundColor: theme.palette.text.primary,
    },
  };
});
const FooterComponent = () => {
  const theme = useTheme();

  const mounted = useHasMounted();
  if (!mounted) {
    return <></>;
  }
  return (
    <footer
      className="footer"
      style={{
        display: "flex",
        flexDirection: "row",
        position: "fixed",
        top: "auto",
        bottom: "0",
        background: theme.palette.secondary.main,
        width: "100%",
        zIndex: "9999",
      }}
    >
      <Container
        sx={{
          gap: 10,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <StyledAudioPlayer
          volume={0.2}
          style={{
            backgroundColor: theme.palette.secondary.main,
            boxShadow: "unset",
          }}
          src="https://backend.daca.vn/assets/audios/ngay-mai-nguoi-ta-lay-chong.mp3"
          onPlay={(e) => console.log("onPlay")}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",

            flexDirection: "column",
          }}
        >
          <div
            style={{
              opacity: "50%",
              fontSize: "15px",
            }}
          >
            Toan dep trai
          </div>
          <div
            style={{
              fontSize: "20px",
              fontWeight: "700",
            }}
          >
            Ngay mai nguoi ta lay chong
          </div>
        </Box>
      </Container>
    </footer>
  );
};
export default FooterComponent;
