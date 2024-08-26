"use client";
import BtnBack from "@/component/btn.back";
import {
  CustomTextFieldPassword,
  CustomTextFieldUsername,
} from "@/component/customComponentMui/text-field-customize";
import ListProvider from "@/component/list-btn-login-provider";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, IconButton, InputAdornment, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";

export default function FormLoginComponent() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isErrorUsername, setIsErrorUsername] = useState<boolean>(false);
  const [isErrorPassword, setIsErrorPassword] = useState<boolean>(false);
  const [errorUserName, setErrorUserName] = useState<string>("");
  const [errorPassword, setErrorPassword] = useState<string>("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsErrorPassword(false);
    setIsErrorUsername(false);
    setErrorPassword("");
    setErrorUserName("");
    const user = e.currentTarget.username.value;
    const password = e.currentTarget.password.value;
    if (!user) {
      setIsErrorUsername(true);
      setErrorUserName("Username is not empty.");
      return;
    }
    if (!password) {
      setIsErrorPassword(true);
      setErrorPassword("Password is not empty.");
      return;
    }
    console.log("user:", user);
    console.log("password:", password);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
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

      <CustomTextFieldUsername
        label="Tài khoản"
        variant="outlined"
        name="username"
        fullWidth
        margin="normal"
        autoFocus
        error={isErrorUsername}
        helperText={errorUserName}
      />

      <CustomTextFieldPassword
        label="Mật khẩu"
        type={showPassword ? "text" : "password"}
        variant="outlined"
        fullWidth
        name="password"
        margin="normal"
        error={isErrorPassword}
        helperText={errorPassword}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)}>
                {showPassword == false ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
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
  );
}
