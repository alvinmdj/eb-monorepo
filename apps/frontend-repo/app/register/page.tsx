"use client";

import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { useDispatch } from "react-redux";

import { auth } from "@/lib/firebase";
import { updateUserData } from "@/store/actions";
import { useAuthCheck } from "@/lib/hooks";
import type { AppDispatch } from "@/store/store";

export default function RegisterPage() {
  useAuthCheck("/", true);

  const dispatch = useDispatch<AppDispatch>();

  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    hobby: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (
      form.email.trim() === "" ||
      form.password.trim() === "" ||
      form.name.trim() === "" ||
      form.hobby.trim() === ""
    ) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await createUserWithEmailAndPassword(auth, form.email, form.password);
      dispatch(updateUserData({ name: form.name, hobby: form.hobby }));
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(err.message);
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
        <Typography variant="h5">Create an Account</Typography>

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

        <TextField
          label="Name"
          fullWidth
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <TextField
          label="Hobby"
          fullWidth
          value={form.hobby}
          onChange={(e) => setForm({ ...form, hobby: e.target.value })}
        />

        <Button
          type="submit"
          variant="contained"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Create Account"}
        </Button>

        {error && <Typography color="error">{error}</Typography>}

        <Typography>
          Already have an account?{" "}
          <Link href="/login" className="hover:underline text-blue-500">
            Login
          </Link>
        </Typography>

        <Button href="/" variant="contained" LinkComponent={Link}>
          Back to Homepage
        </Button>
      </Box>
    </>
  );
}
