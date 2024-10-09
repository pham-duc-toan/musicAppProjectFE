import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";

// Định nghĩa kiểu cho đối tượng playlist
interface Playlist {
  title: string;
  listSong: Array<string>;
  [key: string]: any;
}

interface PlaylistItemProps {
  playlist: Playlist;
}

const PlaylistItem: React.FC<PlaylistItemProps> = ({ playlist }) => {
  return (
    <Card sx={{ display: "flex", mb: 2 }}>
      <CardMedia
        component="img"
        sx={{ width: 160 }}
        image="https://res.cloudinary.com/dsi9ercdo/image/upload/v1728369637/lxwaiiafcrcwqji0swn6.png"
        alt={playlist.title}
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent>
          <Typography
            component="div"
            variant="h5"
            height={"100px"}
            sx={{
              fontSize: "20px",
              lineHeight: "1.3",
              height: "78px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
              wordWrap: "break-word",
            }}
          >
            {playlist.title}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
            height={"50%"}
            noWrap
          >
            {playlist.listSong.length} bài hát
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
};

export default PlaylistItem;
