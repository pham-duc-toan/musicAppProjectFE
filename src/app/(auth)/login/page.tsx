import FormLoginComponent from "@/app/(auth)/login/components/form-login";
import { Box } from "@mui/system";

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
