import CustomTextField from "@/component/customComponentMui/text-field-input";
import { Button, TextField, Typography } from "@mui/material";
import { bgcolor, Box } from "@mui/system";

export default function Login() {
  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "300px",
        margin: "0 auto",
        padding: "20px",
        borderRadius: "8px",

        bgcolor: "#000",

        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: "20px", color: "#fff" }}>
        Đăng nhập
      </Typography>

      <CustomTextField
        label="Tài khoản"
        variant="outlined"
        fullWidth
        margin="normal"
        required
      />

      <CustomTextField
        label="Mật khẩu"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        required
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ marginTop: "20px" }}
        fullWidth
      >
        Đăng nhập
      </Button>
    </Box>
  );
}
