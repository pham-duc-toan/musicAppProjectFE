import FormLoginComponent from "@/component/form-login";
import { bgcolor, Box } from "@mui/system";

import { redirect } from "next/navigation";

export default async function Login() {
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
      <FormLoginComponent />
    </Box>
  );
}
