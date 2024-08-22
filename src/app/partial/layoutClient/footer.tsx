"use client";

import { useHasMounted } from "@/app/utils/customHook";
import { pause, play } from "@/store/playingMusicSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useTheme } from "@mui/material";
import { Box, Container, styled } from "@mui/system";
import { useEffect, useRef } from "react";
import H5AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useDispatch, useSelector } from "react-redux";

// Định nghĩa StyledAudioPlayer
const StyledAudioPlayer = styled(H5AudioPlayer)(({ theme }) => ({
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
}));

const FooterComponent = () => {
  const theme = useTheme();
  const dispatch: AppDispatch = useDispatch();
  const songCurrent = useSelector((state: RootState) => state.playingMusic);

  const playerRef = useRef<H5AudioPlayer | null>(null);
  const mounted = useHasMounted();

  useEffect(() => {
    if (mounted) {
      if (playerRef.current && playerRef.current.audio.current?.play()) {
        if (songCurrent.isPlaying) {
          playerRef.current.audio.current.play().catch((error) => {
            console.error("Error playing audio:", error);
          });
        } else {
          playerRef.current.audio.current.pause();
        }
      }
    }
  }, [songCurrent.isPlaying, mounted]);

  if (!mounted) {
    return null;
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
          ref={playerRef}
          volume={0.2}
          style={{
            backgroundColor: theme.palette.secondary.main,
            boxShadow: "unset",
          }}
          src={songCurrent.audio}
          onPause={() => dispatch(pause())}
          onPlay={() => dispatch(play())}
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
            {songCurrent.singerFullName}
          </div>
          <div
            style={{
              fontSize: "20px",
              fontWeight: "700",
            }}
          >
            {songCurrent.title}
          </div>
        </Box>
      </Container>
    </footer>
  );
};

export default FooterComponent;
