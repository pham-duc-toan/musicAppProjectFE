"use client";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";

export default function BtnBackHome() {
  const router = useRouter();

  return <Button onClick={() => router.push("/")}>Back to HomePage</Button>;
}
