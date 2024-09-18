"use client";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Snackbar, Alert } from "@mui/material";
import RefreshToken from "./component/refresh-token";
// Tạo context
const AppContext = createContext({
  showMessage: (message: string, severity: "success" | "error") => {},
});

// Tạo provider cho SnackbarContext
const ContextApp: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  //alert

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState<"success" | "error">("success");
  const showMessage = (message: string, severity: "success" | "error") => {
    setSnackbarMessage(message);
    setSeverity(severity);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  //end alert

  return (
    <AppContext.Provider value={{ showMessage }}>
      <RefreshToken />
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
    </AppContext.Provider>
  );
};
export default ContextApp;
// Hook để sử dụng context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within a AppContext");
  }
  return context;
};
