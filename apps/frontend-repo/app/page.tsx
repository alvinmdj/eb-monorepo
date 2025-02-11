"use client";

import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

import { Container, Typography } from "@mui/material";

import UpdateButton from "@/components/user-update";
import { UserInfo } from "@/components/user-info";
import { AuthButton } from "@/components/auth-button";

export default function Home() {
  const { error } = useSelector((state: RootState) => state.user);

  return (
    <Container maxWidth="sm" sx={{ marginTop: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        User Management
      </Typography>

      <AuthButton />

      <UserInfo />

      <UpdateButton />

      {error && (
        <Typography marginTop={2} color="error">
          {error}
        </Typography>
      )}
    </Container>
  );
}
