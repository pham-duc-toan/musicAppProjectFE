import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import FormLoginComponent from "@/component/form-login";
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
      <FormLoginComponent />
    </Box>
  );
}
