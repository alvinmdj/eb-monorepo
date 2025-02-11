"use client";

import Link from "next/link";
import { FirebaseError } from "firebase/app";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

import { auth } from "@/lib/firebase";
import { useAuthCheck } from "@/lib/hooks";

export default function LoginPage() {
  useAuthCheck("/", true);

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (form.email.trim() === "" || form.password.trim() === "") {
      setError("Email and password are required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
    } catch (err) {
      if (
        err instanceof FirebaseError &&
        err.code === "auth/invalid-credential"
      ) {
        setError("Invalid email or password");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          maxWidth: 360,
          margin: "auto",
          padding: 3,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h5">Login</Typography>

        <TextField
          label="Email"
          type="email"
          fullWidth
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <Button
          type="submit"
          variant="contained"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Login"}
        </Button>

        {error && <Typography color="error">{error}</Typography>}

        <Typography>
          Don&apos;t have an account?{" "}
          <Link href="/register" className="hover:underline text-blue-500">
            Create Account
          </Link>
        </Typography>

        <Button href="/" variant="contained" LinkComponent={Link}>
          Back to Homepage
        </Button>
      </Box>
    </>
  );
}
