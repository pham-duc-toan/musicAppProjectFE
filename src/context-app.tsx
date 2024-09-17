"use client";
import React, { createContext, useContext, useState } from "react";
import { Snackbar, Alert } from "@mui/material";

// Định nghĩa interface cho context
interface SnackbarContextProps {
  showMessage: (message: string, severity: "success" | "error") => void;
}

// Tạo context
const SnackbarContext = createContext<SnackbarContextProps | undefined>(
  undefined
);

// Tạo provider cho SnackbarContext
const ContextApp: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState<"success" | "error">("success");

  // Hàm hiển thị thông báo
  const showMessage = (message: string, severity: "success" | "error") => {
    setSnackbarMessage(message);
    setSeverity(severity);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <SnackbarContext.Provider value={{ showMessage }}>
      {children}

      {/* Snackbar cho hiển thị thông báo */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};
export default ContextApp;
// Hook để sử dụng context
export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};
