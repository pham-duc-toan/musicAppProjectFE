import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BtnBack from "@/component/btn.back";
import CustomTextField from "@/component/customComponentMui/text-field-input";
import ListProvider from "@/component/list-btn-login-provider";
import { Button, TextField, Typography } from "@mui/material";
import { bgcolor, Box } from "@mui/system";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Login() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/");
  }
  return (
    <Box
      sx={{
        height: "60vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
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
          background: "theme.palette.background.default",

          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            marginBottom: "20px",
            color: "theme.palette.text.primary",
          }}
        >
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
        <BtnBack />
        <ListProvider />
      </Box>
    </Box>
  );
}
