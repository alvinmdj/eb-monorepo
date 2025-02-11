"use client";

import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";

import type { AppDispatch, RootState } from "@/store/store";
import { updateUserData } from "@/store/actions";
import { useState } from "react";

export default function UpdateButton() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.user);

  const [form, setForm] = useState({
    name: "",
    hobby: "",
  });
  const [error, setError] = useState("");

  function handleUpdate() {
    setError("");

    if (form.name.trim() === "" || form.hobby.trim() === "") {
      setError("All fields are required");
      return;
    }

    dispatch(updateUserData(form));
  }

  return (
    <Box
      sx={{
        border: "1px solid #ccc",
        padding: 2,
        width: "100%",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h6">Set User Information</Typography>

      <TextField
        label="Name"
        type="text"
        fullWidth
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <TextField
        label="Hobby"
        type="text"
        fullWidth
        value={form.hobby}
        onChange={(e) => setForm({ ...form, hobby: e.target.value })}
      />

      <Button onClick={handleUpdate} disabled={loading} variant="contained">
        {loading ? <CircularProgress size={24} /> : "Update User"}
      </Button>

      {error && <Typography color="error">{error}</Typography>}
    </Box>
  );
}
